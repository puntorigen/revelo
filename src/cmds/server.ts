import Command from '../common/command'
const md = require('markdown-it')();
const fs = require('fs').promises;
const path = require('path');
const promisify = require('util').promisify;
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
            console.log('tmpdir',tmpdir); 
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
        const yaml = require('yaml');
        const mdSource = await fs.readFile(sourceFile,{ encoding:'utf-8' });
        //init markdown plugins
        md.use(require('markdown-it-front-matter'),(x)=>{ slides.config=yaml.parse(x) });
        md.use(require('markdown-it-revealjs'),()=>{});
        md.use(require('markdown-it-task-lists'),()=>({ enabled:true }));
        md.use(require('markdown-it-emoji'));
        //pre-process specific contents
        
        //process
        let parsed = md.parse(mdSource,{});
        let rendered = md.render(mdSource);
        this.x_console.out({message:'md rendered',data:{rendered, slides} });
        await this.finish(300);

        //console.log(parsed);
        //this.debug('slides',{slides,num:slides.slides.length});
    }

    async process() {
        //const reveal = await this.baseReveal();
        //console.log('reveal',reveal);
        let reveal = { presentation:'x' };
        await this.createPresentation(reveal.presentation);
        /*
        const root = require('find-root')(__dirname)
        const source = path.join(root,'db.json')
        await fs.copyFile(source,target);
        this.log('DB backup written successfully!','green')*/
    }

}