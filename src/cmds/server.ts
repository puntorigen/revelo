import Command from '../common/command'
const marked = require('marked').marked;
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
        const mdSource = await fs.readFile(sourceFile,{ encoding:'utf-8' });
        let parsed = marked.lexer(mdSource);
        slides = { slides:[], config:{} };
        let tmp = { configSlide:false, tmpdir, config:[], acumulate:[] };
        parsed.forEach(async(item,idx)=>{
            if (item.type=='hr' && idx==0) {
                // this is a config slide
                tmp.configSlide=true;
            } else if (tmp.configSlide==true) {
                // inside config slide
                if (item.type=='hr') {
                    //end of configSlide
                    tmp.configSlide=false;
                    //transform tmp config array to slides config obj
                    let yaml = require('yaml');
                    tmp.config.forEach((row)=>{
                        try {
                            slides.config = {...slides.config,...yaml.parse(row.raw)};
                        } catch(configErr) {
                            slides.configError = true;
                        }
                    });
                } else {
                    tmp.config.push(item);
                }
            } else {
                //other things
                if (item.type!='hr' && item.type!='heading') {
                    tmp.acumulate.push(item);
                } else if (item.type=='heading' && idx>0 && parsed[idx-1].type!='hr') {
                    //new slide by header (add item to new slide)
                    if (item.text.indexOf(`people's network`)!=-1) console.log('DUMMY how are dump',{item,idx,tmp});
                    if (tmp.acumulate.length>0) {
                        slides.slides.push(tmp.acumulate);
                        tmp.acumulate = [];
                    }
                    tmp.acumulate.push(item);
                } else if (item.type=='hr') {
                    //new slide by --- (omit item)
                    slides.slides.push(tmp.acumulate);
                    tmp.acumulate = [];

                } else if (item.type=='heading' && idx>0 && parsed[idx-1].type=='hr') {
                    //heading inside just created new slide
                    tmp.acumulate.push(item);
                } else {
                    slides.slides.push(tmp.acumulate);
                    tmp.acumulate = [];
                    tmp.acumulate.push(item);
                }
            }
        });
        console.log(parsed);
        this.debug('slides',slides);
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