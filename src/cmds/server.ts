import Command from '../common/command'
import Helper from '../common/helper'

const fs = require('fs').promises;
const path = require('path');
const helper = new Helper();
const promisify = require('util').promisify;
let firstReveal = '';
let sourceFile = '', tmpdir = '';
let slides:any = {};

//starts a local web server with the presentation
export default class Server extends Command {

    async init() {
        //@todo read this values from a theme.json file
        this.setColorTokens({
            '*':'yellow',
            '#':'cyan',
            '@':'green',
            '!':'brightRed'
        });
        let file = '';
        if (this.arg._.length==0) file = await this.ask(`Please enter the filename for the DB backup:`);
        if (this.arg._.length>0) file = this.arg._.shift();
        sourceFile = path.join(process.cwd(),file);
        try {
            await fs.stat(sourceFile)
            const dir = promisify(require('tmp').dir);
            tmpdir = await dir();
            //console.log('tmpdir',tmpdir); 
            return true;
        } catch {
            this.log(`Error: the given file doesn't exist`);
            return false;
        }
    }

    async baseReveal() {
        //get https://github.com/hakimel/reveal.js/archive/master.zip
        //unzip on tmp directory
        const dl = require('download-file-with-progressbar');
        const asPromise = ()=>new Promise((resolve,reject)=>{
            const dd = dl('https://github.com/hakimel/reveal.js/archive/master.zip',{
                dir: tmpdir,
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
        await extract(down.path, { dir:tmpdir });
        return {
            path:tmpdir+`/reveal.js-master`,
            presentation:path.join(tmpdir,'reveal.js-master','index.html'),
            file:down.path
        };
    }

    async createPresentation(target:String) {
        slides = { slides:[], config:{} };
        const md = require('markdown-it')();
        const yaml = require('yaml');
        const extractjs = require('extractjs');
        const mdSource = await fs.readFile(sourceFile,{ encoding:'utf-8' });
        //init markdown plugins
        md.use(require('markdown-it-front-matter'),(x)=>{ slides.config=yaml.parse(x) });
        md.use(require('markdown-it-revealjs'),()=>{});
        md.use(require('markdown-it-task-lists'),()=>({ enabled:true })); // - [ ] task
        md.use(require('markdown-it-emoji')); // ;)
        md.use(require('markdown-it-video')); //@[youtube](codigo)
        md.use(require('markdown-it-include'),{ root:path.dirname(sourceFile) }); // !!!include(file.md)!!!
        md.use(require('markdown-it-anchor').default);
        md.use(require('markdown-it-table-of-contents'));
        //md.use(require('markdown-it-custom-block'));
        let rendered = md.render(mdSource);
        //post-process
        const cheerio = require('cheerio');
        let $ = cheerio.load(rendered,{ xmlMode:true, decodeEntities:false });
        $('section section').each(function(this: cheerio.Element, idx, item) {
            const item_ = $(this);
            let content_ = item_.html();
            // :::{cmd}
            let extract = extractjs({ startExtract:`[`, endExtract:`]` });
            let pattern = extract(`:::{[command]}[content]:::`);
            let ex = pattern.extract(content_);
            if (ex.command) {
                if (ex.command=='incremental') {
                    item_.html(content_.replace(pattern.interpolate(ex),ex.content));
                    item_.find('*').each(function(this: cheerio.Element, idx, item) {
                        const item2_ = $(this);
                        item2_.addClass('fragment');
                    });
                }
            }
            //->[background](happy people)
            extract = extractjs();
            pattern = extract(`-&gt;{command}({content})`);
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
                }
            }
            //console.log('extraction',ex);
        });
        rendered = $.html();
        rendered += `<script src="http://127.0.0.1:35729/livereload.js?snipver=1" async="" defer=""></script>`;
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
            await fs.writeFile(target, $.html(), 'utf-8', {
                encoding: 'utf8',
                flag: 'w'
            })
        }
        //debug
        //this.x_console.out({message:'md rendered',data:{rendered, slides} });
    }

    async process() {
        const spinner = this.x_console.spinner();
        spinner.start('preparing presentation ..');
        const reveal = await this.baseReveal();
        spinner.succeed('prepared');
        spinner.start('generating presentation');
        await this.createPresentation(reveal.presentation);
        spinner.succeed('presentation ready');
        //monitor generated files for browser reload
        spinner.start('starting server');
        const live = require('livereload');
        const liveServer = live.createServer();
        liveServer.watch(reveal.path); //watch generated folder
        //launch server, monitor filechanges
        let express = require('express');
        let app = express();
        app.use(express['static'](reveal.path));
        app.listen(3000);
        spinner.succeed('server listening on #http://127.0.0.1:3000#');
        //monitor given md file changes
        const watch = require('node-watch');
        watch(path.dirname(sourceFile),{},async (evt,name)=>{
            spinner.start('file change detected! @updating@');
            try {
                await this.createPresentation(reveal.presentation);
                spinner.succeed('@presentation updated!@');
            } catch(err) {
                spinner.fail('!error rendering update! check source file');
            }
        });
        //detect abort process by user
        process.on('SIGINT', async()=>{
            //clean tmpdir
            spinner.start('EXIT detected! Cleaning tmp files ..');
            await fs.rm(tmpdir, { recursive:true });
            spinner.succeed('!exit ready!, @have a nice day@! ;)');
            //exit
            this.finish(10);
        });
    }

}