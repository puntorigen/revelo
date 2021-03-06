let firstReveal = '';
const fs = require('fs').promises;
const path = require('path');
const random = (min, max) => {  
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
};

export default class presentation {
    x_console: any
    sourceFile: string

    constructor(sourcefile) {
        this.x_console = new (require('@concepto/console'))()
        this.sourceFile = sourcefile;
    }

    async downloadFile(url,directory) {
        const dl = require('download-file-with-progressbar');
        const this_ = this;
        const asPromise = ()=>new Promise((resolve,reject)=>{
            const dd = dl(url,{
                dir: directory,
                onDone: (info)=>{
                    resolve(info);
                },
                onProgress: (x)=>{
                },
                onError: (err)=>{
                    reject(err);
                }
            });
        });
        const down:any = await asPromise();
        return down;
    }

    async baseReveal(directory) {
        //get https://github.com/hakimel/reveal.js/archive/master.zip
        //unzip on tmp directory
        const down:any = await this.downloadFile('https://github.com/hakimel/reveal.js/archive/master.zip',directory);
        //extract zip
        const extract = require('extract-zip');
        await extract(down.path, { dir:directory });
        return {
            path:directory+`/reveal.js-master`,
            presentation:path.join(directory,'reveal.js-master','index.html'),
            file:down.path
        };
    }

    async convertToWebm(mp4,output,fps=25) {
        let ffmpeg = require('fluent-ffmpeg');
        const ffmpeg_bin = require('ffmpeg-static');
        ffmpeg.setFfmpegPath(ffmpeg_bin);
        const asPromise = ()=>new Promise((resolve,reject)=>{
            ffmpeg(mp4) .videoCodec('libvpx-vp9')   //libvpx
                        .videoBitrate(1000,true)    //700
                        .size('30%')
                        .withFps(fps)
                        .outputOptions(
                            '-minrate', '1000', //700
                            '-maxrate', '1000',
                            '-threads', '8',
                            '-flags', '+global_header',
                            '-psnr',
                            '-lossless','1' //1
                        ).on('error', function(err,stdout,stderr) {
                            reject(err);
                        }).on('progress', function(progress) {
                            //console.log(`${progress.percent}% done`);
                        }).on('end', function(err,stdout,stderr) {
                            resolve(stdout);
                        }).save(output);
        });
        const down:any = await asPromise();
        return down;
    }

    async createPresentation(serverUrl:String,target:String,options:any,spinner?) {
        const md = require('markdown-it')();
        const yaml = require('yaml');
        const extractjs = require('extractjs');
        const mdSource = await fs.readFile(this.sourceFile,{ encoding:'utf-8' });
        let replies = [], meta = { numSlides:0, slides:[], totalTime:0 };
        let config:any = {...options};
        //init markdown plugins
        md.use(require('markdown-it-front-matter'),(x)=>{ config={...yaml.parse(x),...options}; delete config.downloadAssets; });
        md.use(require('markdown-it-revealjs'),()=>{});
        md.use(require('markdown-it-task-lists'),()=>({ enabled:true })); // - [ ] task
        md.use(require('markdown-it-emoji')); // ;)
        md.use(require('markdown-it-video')); //@[youtube](codigo)
        md.use(require('markdown-it-include'),{ root:path.dirname(this.sourceFile) }); // !!!include(file.md)!!!
        md.use(require('markdown-it-anchor').default);
        md.use(require('markdown-it-table-of-contents'));
        //md.use(require('markdown-it-multimd-table'));
        md.use(require('markdown-it-attrs'),{
            leftDelimiter: '<(',
            rightDelimiter: ')>'
        });
        //md.use(require('markdown-it-custom-block'));
        //pre-process parsed tokens
        let tokens = md.parse(mdSource,{});
        //this.x_console.out({ message:'debug tokens', data:tokens });
        //let rendered = md.render(mdSource);
        //render tokens
        let rendered = md.renderer.render(tokens,md.options);
        //post-process
        const cheerio = require('cheerio');
        let $ = cheerio.load(rendered,{ xmlMode:true, decodeEntities:false });
        const sections = $('section section').toArray();
        meta.numSlides = sections.length; //number of slides
        const timeToRead = require('reading-time');
        let videos_ = 0;
        //$('section section').each(function(this: cheerio.Element, idx, item) {
        for (let i=0; i < sections.length; i++) {
            const item_ = $(sections[i]);
            let metaSlide:any = { time:timeToRead(item_.html(),{ wordsPerMinute:100 }), pictures:0, videos:0 };
            let slideTime = 0;
            for (let x=0;x<10;x++) {
                let content_ = item_.html();
                // :::{cmd}
                let extract = extractjs({ startExtract:`[`, endExtract:`]` });
                let pattern = extract(`:::{[command]}[content]:::`);
                let ex = pattern.extract(content_);
                if (ex.command) {
                    if (ex.command=='incremental') {
                        let $2 = cheerio.load(ex.content,{ xmlMode:true, decodeEntities:false });
                        $2('*').each(function(this: cheerio.Element, idx, item) {
                            const item2_ = $(this);
                            if (item2_[0].name!='ol' && item2_[0].name!='ul') {
                                item2_.addClass('fragment');
                                item2_.addClass('fade-up');
                            }
                        });
                        item_.html(content_.replace(pattern.interpolate(ex),$2.html()));
                    }
                }
                //->[background](happy people)
                content_ = item_.html();
                extract = extractjs();
                pattern = extract(`-&gt;{command}[{content}]`);
                ex = pattern.extract(content_);
                if (ex.command) {
                    item_.html(content_.replace(pattern.interpolate(ex),'')); //erase directive
                    if (ex.command=='background') {
                        if (ex.content.indexOf(',')!=-1) { //opacity within value
                            item_.attr('data-background-opacity',ex.content.split(',')[1]);
                            ex.content = ex.content.split(',')[0];
                        }
                        if (ex.content.indexOf('http')==-1 && ex.content.indexOf('.jpg')==-1 && ex.content.indexOf('.png')==-1) {
                            const encode = require('querystring').escape;
                            item_.attr('data-background-image',`https://source.unsplash.com/random?${encode(ex.content)}/1024x768`);
                        } else if (ex.content.indexOf('.jpg')!=-1 || ex.content.indexOf('.png')!=-1) {
                            // @todo add support for local images
                        } else {
                            item_.attr('data-background-image',ex.content);
                            metaSlide.pictures += 1;
                        }
                    } else if (ex.command=='background-color') {
                        item_.attr('data-background-color',ex.content);
                    } else if (ex.command=='background-video') {
                        metaSlide.videos += 1;
                        if (ex.content.indexOf(',')!=-1) { //opacity within value
                            item_.attr('data-background-opacity',ex.content.split(',')[1]);
                            ex.content = ex.content.split(',')[0];
                        }
                        let chosen = -1;
                        if (ex.content.indexOf('-')!=-1) { //video num specified
                            chosen = parseInt(ex.content.split('-')[1]);
                            ex.content = ex.content.split('-')[0];
                        }
                        if (ex.content.indexOf('http')==-1 && ex.content.indexOf('.mp4')==-1 && ex.content.indexOf('.mov')==-1) {
                            //search by keywords using pexels API
                            const pexels = require('node-pexels').Client;
                            //console.log('pexels debug',pexels);
                            //decrypt api key
                            const encryptor = require('simple-encryptor')('revelo is a awesome text based presentation tool!');
                            const apiKey = 'dc4df714bb25c51ba2676635a56e79137eec6bfec70c50c4a347e96af8bdb554382171bab5e8dbb29c529aa8305327caiSUeI2PXagkEVPuGaQegpArItV7G7WlrDcA1PkopgLMuG1Dt1abPGgLB6EwnSGVzAuskFYA836fZ8OjbM0dFkg==';
                            const pexelClient = new pexels({ apiKey:encryptor.decrypt(apiKey) });
                            const videos = await pexelClient.v1.videos.search(ex.content);
                            if (chosen==-1 || chosen>videos.videos.length) chosen = random(0,videos.videos.length-1);
                            if (videos.videos.length==0) {
                                replies.push({ type:'warning', text:`there are no background-videos for '${ex.content}' (omitting, slide:${i+1})` });
                            } else {
                                let mp4 = videos.videos[chosen].video_files[0].link; // lowest quality first (@todo we should filter the array by quality) { id,quality='hd,sd',file_type,width,height,link }
                                if (options.downloadAssets && options.downloadAssets!='') {
                                    //download mp4 link into tmpdir, convert to webm and define as local asset
                                    let just_file = random(0,10000);
                                    let new_mp4 = path.join(options.downloadAssets,'reveal.js-master',just_file + '.mp4');
                                    //const downMP4:any = await this.downloadFile(mp4,options.downloadAssets);
                                    let new_webm = new_mp4.replaceAll('.mp4','.webm');
                                    let fps_ = options.fps?options.fps:25;
                                    videos_ += 1;
                                    if (spinner) spinner.text(`downloading & converting background-video ${videos_} (fps:${fps_})`);
                                    let resp = await this.convertToWebm(mp4,new_webm,fps_); //@refactor spinner: this is really ugly
                                    mp4 = '/'+just_file + '.webm';
                                    //console.log(`result`,resp);
                                }
                                //console.log(`pexel video (chosen:${chosen})`,{mp4,raw:videos.videos[chosen].video_files[0]});
                                //console.log(`pexels videos (chosen:${chosen})`,videos.videos[chosen]);
                                mp4 = mp4.replaceAll('https:','http:');
                                item_.attr('data-background-video',mp4);
                                item_.attr('data-background-video-muted',true);
                                item_.attr('data-background-video-loop',true);
                            }
                        } else {
                            // @todo add support for local videos
                            item_.attr('data-background-video',ex.content);
                        }
                        //
                    } else if (ex.command=='sleep' || ex.command=='wait') {
                        item_.attr('data-autoslide',ex.content);
                        slideTime = parseInt(ex.content);
                    } else if (ex.command=='transition') {
                        item_.attr('data-transition',ex.content);
                    }
                }
            }
            if ((options.video || options.autoSlide) && slideTime==0) {
                //if video mode, and slideTime is undefined
                if (options.tps && options.tps=='auto') {
                    //if tfs=auto use metaSlide.time.time arg, if not use value*1000 (secs->ms)
                    slideTime = Math.max(metaSlide.time.time,3000); //min 3 secs
                } else if (options.tps && parseInt(options.tps)>0) {
                    //use value*1000
                    slideTime = parseInt(options.tps)*1000;
                }
                item_.attr('data-autoslide',slideTime);
            }
            meta.totalTime = meta.totalTime+slideTime;
            meta.slides.push(metaSlide);
            //this.x_console.debug('DEBUG !! ',{slideTime,options,metaSlide,meta});
            //console.log('extraction',ex);
        };
        rendered = $.html();
        if (serverUrl.indexOf('loca.lt')==-1 && serverUrl!='') {
            //if serverUrl is not localtunnel (loca.lt), enable hot-reload
            rendered += `<script src="${serverUrl}/livereload.js?snipver=1" async="" defer=""></script>`;
        }
        //rendered += ``;
        //update index.html file received on arg
        //this.x_console.out({ message:'THIS CONFIG PRESENTATION', data:config });
        if (target!='') {
            if (firstReveal=='') {
                firstReveal = await fs.readFile(target,{ encoding:'utf-8' });
            }
            let $ = cheerio.load(firstReveal); //,{ xmlMode:true, decodeEntities:false });
            $('div[class=reveal]').each(function(this: cheerio.Element, idx, item) {
                $(this).replaceWith(rendered);
            });
            //add front matter config as Reveal.configure
            if (!this.isObjEmpty(config)) {
                let last_script = $('script').last().html();
                last_script += `\n\t\t\tReveal.configure(${JSON.stringify(config)});`;
                last_script += `\nReveal.on( 'slidetransitionend', function(event) {
                    console.log('slidetransitionend slide indexH:'+event.indexh); //,event.currentSlide
                } );`;
                $('script').last().html(last_script);
            }
            //add mermaidjs script support
            let codes_ = $('code').toArray();
            let usesMermaid = false;
            codes_.forEach(test=> {
                let item = $(test);
                let inner_ = item.html();
                let class_ = item.attr('class');
                let type_ = 'LR';
                if (class_.indexOf('language-diagram')!=-1) {
                    usesMermaid = true;
                    if (class_.indexOf(',')!=-1) {
                        type_ = class_.split(',')[1].trim();
                    }
                }
                let new_ = `<div class="mermaid">\ngraph ${type_}\n${inner_}</div>`;
                item.parent('pre').replaceWith(new_);
            });
            //console.log('test mermaid',test_);
            let body_ = $('body').toArray();
            body_.forEach(element => {
                if (usesMermaid) {
                    let content = $(element).html();
                    content += `<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
                    <script>
                        mermaid.initialize({ startOnLoad: true });
                    </script>`;
                    $(element).html(content);
                }
            });
            //add tags to head: <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"/>
            //tachyons css
            let head_ = $('head').toArray();
            head_.forEach(element => {
                let item = $(element);
                let inner_ = item.html();
                inner_ += `<link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"/>\n`;
                if (options.video) {
                    inner_ += `<style>
                        .playback {
                            display: none !important;
                        }
                    </style>\n`;
                };
                item.html(inner_);
            });
            //write html
            let decode_ = require('decode-html');
            let to_render = $.html();
            if (usesMermaid) to_render = decode_(to_render);
            await fs.writeFile(target, decode_(to_render), 'utf-8', {
                encoding: 'utf8',
                flag: 'w'
            })
        }
        //debug
        //this.x_console.out({message:'md rendered',data:{rendered, slides} });
        return { warnings:replies, meta };
    }
    
    isObjEmpty(obj) {
        //fastest algorithm
        for (let x in obj) return false;
        return true;
    }
}