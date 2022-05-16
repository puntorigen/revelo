let firstReveal = '';
const fs = require('fs').promises;
const path = require('path');

export default class presentation {
    x_console: any
    sourceFile: string

    constructor(sourcefile) {
        this.x_console = new (require('@concepto/console'))()
        this.sourceFile = sourcefile;
    }

    async baseReveal(directory) {
        //get https://github.com/hakimel/reveal.js/archive/master.zip
        //unzip on tmp directory
        const dl = require('download-file-with-progressbar');
        const asPromise = ()=>new Promise((resolve,reject)=>{
            const dd = dl('https://github.com/hakimel/reveal.js/archive/master.zip',{
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
        //extract zip
        const extract = require('extract-zip');
        await extract(down.path, { dir:directory });
        return {
            path:directory+`/reveal.js-master`,
            presentation:path.join(directory,'reveal.js-master','index.html'),
            file:down.path
        };
    }

    async createPresentation(serverUrl:String,target:String,options:any) {
        const md = require('markdown-it')();
        const yaml = require('yaml');
        const extractjs = require('extractjs');
        const mdSource = await fs.readFile(this.sourceFile,{ encoding:'utf-8' });
        let config = {};
        //init markdown plugins
        md.use(require('markdown-it-front-matter'),(x)=>{ config={...yaml.parse(x),...options} });
        md.use(require('markdown-it-revealjs'),()=>{});
        md.use(require('markdown-it-task-lists'),()=>({ enabled:true })); // - [ ] task
        md.use(require('markdown-it-emoji')); // ;)
        md.use(require('markdown-it-video')); //@[youtube](codigo)
        md.use(require('markdown-it-include'),{ root:path.dirname(this.sourceFile) }); // !!!include(file.md)!!!
        md.use(require('markdown-it-anchor').default);
        md.use(require('markdown-it-table-of-contents'));
        //md.use(require('markdown-it-custom-block'));
        let rendered = md.render(mdSource);
        //post-process
        const cheerio = require('cheerio');
        let $ = cheerio.load(rendered,{ xmlMode:true, decodeEntities:false });
        $('section section').each(function(this: cheerio.Element, idx, item) {
            const item_ = $(this);
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
                        if (ex.content.indexOf(',')!=-1) {
                            item_.attr('data-background-opacity',ex.content.split(',')[1]);
                            ex.content = ex.content.split(',')[0];
                        }
                        if (ex.content.indexOf('http')==-1) {
                            const encode = require('querystring').escape;
                            item_.attr('data-background-image',`https://source.unsplash.com/random?${encode(ex.content)}/1024x768`);
                        } else {
                            item_.attr('data-background-image',ex.content);
                        }
                    } else if (ex.command=='background-color') {
                        item_.attr('data-background-color',ex.content);
                    } else if (ex.command=='sleep' || ex.command=='wait') {
                        item_.attr('data-autoslide',ex.content);
                    } else if (ex.command=='transition') {
                        item_.attr('data-transition',ex.content);
                    }
                }
            }
            //console.log('extraction',ex);
        });
        rendered = $.html();
        if (serverUrl.indexOf('loca.lt')==-1) {
            //if serverUrl is not localtunnel (loca.lt), enable hot-reload
            rendered += `<script src="${serverUrl}/livereload.js?snipver=1" async="" defer=""></script>`;
        }
        //rendered += ``;
        //update index.html file received on arg
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
                $('script').last().html(last_script);
            }
            let to_render = $.html();
            await fs.writeFile(target, to_render, 'utf-8', {
                encoding: 'utf8',
                flag: 'w'
            })
        }
        //debug
        //this.x_console.out({message:'md rendered',data:{rendered, slides} });
    }
    
    isObjEmpty(obj) {
        //fastest algorithm
        for (let x in obj) return false;
        return true;
    }
}