import Command from '../common/command'
import Presentation from '../common/presentation'
import ansi from 'ansi-escapes'

const fs = require('fs').promises;
const path = require('path');
const emoji = require('node-emoji');
const promisify = require('util').promisify;
let sourceFile = '', tmpdir = '';

//starts a local web server with the presentation
export default class Server extends Command {
    presentation: any

    async init() {
        //@todo read this values from a theme.json file
        this.setColorTokens({
            '*':'yellow',
            '#':'cyan',
            '@':'green',
            '|':'brightRed'
        });
        let file = '';
        try {        
            if (this.arg._.length==0) file = await this.ask(`Please enter the filename with the presentation:`);
            if (this.arg._.length>0) file = this.arg._.shift();
            sourceFile = path.join(process.cwd(),file);
        } catch(errLoad) {
            sourceFile = '';
        }
        if (file=='' || sourceFile=='') {
            this.x_console.out({ message:`|Error! No file given! Bye bye!|` });
            await this.finish(304);
        }
        this.presentation = new Presentation(sourceFile);
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

    async process() {
        const spinner = this.x_console.spinner();
        const tunnel = require('localtunnel');
        let server = `http://127.0.0.1:3000`;
        let liveUrl = `http://127.0.0.1:35729`;
        if (this.arg.public) {
            const random = (min, max) => {  
                return Math.floor(
                    Math.random() * (max - min + 1) + min
                )
            };
            //starts tunnel
            spinner.start('preparing public access ..');
            try {
                server = (await tunnel({ port:3000, subdomain:'revelo'+random(100,999) })).url;
                spinner.text('preparing remote hot-reloading support');
                liveUrl = (await tunnel({ port:35729, subdomain:'revelo'+random(100,999) })).url;
                spinner.succeed('public access prepared! (hot-reloading disabled)');
                //console.log('public urls',server,liveUrl);
            } catch(errRemote) {
                spinner.fail('public access failed!');
            }
        }
        spinner.start('preparing presentation ..');
        const reveal = await this.presentation.baseReveal(tmpdir);
        //console.log(reveal); //@todo remove
        spinner.text('generating presentation');
        let options_:any = { hideInactiveCursor:true, pdfSeparateFragments:false };
        try {
            if (this.arg.autoplay) options_ = {...options_,
                ...{ 
                    video:true, 
                    autoSlide: true, 
                    progress: false,
                    loop: true,
                    controls: false
                }};
            let warnings = await this.presentation.createPresentation(liveUrl,reveal.presentation,options_);
            if (warnings.length>0) {
                spinner.warn('presentation generated with warnings:');
                warnings.forEach((item)=>{
                    this.x_console.out({ color:'yellow', message:`${item.type}: ${item.text}` });
                });
            } else {
                spinner.succeed('presentation ready');
            }
        } catch(errPres) {
            spinner.fail('presentation generation failed');
            console.log(errPres);
        }
        //monitor generated files for browser reload
        spinner.start('starting server');
        const live = require('livereload');
        const liveServer = live.createServer();
        liveServer.watch(reveal.path); //watch generated folder
        //console.log('revelo path: '+reveal.path);
        //launch server, monitor filechanges
        let express = require('express');
        let app = express();
        app.use(express['static'](reveal.path));
        app.use(express['static'](path.dirname(sourceFile))); //add md file within / public path as well
        app.listen(3000);
        const serverLink = ansi.link(server,server);
        spinner.succeed(`server listening on #${serverLink}#`);
        //open browser
        if ((this.arg.browser && this.arg.browser==false) || typeof this.arg.browser === 'undefined') {
            const open = require('open');
            await open(server)
        }
        //monitor given md file changes
        const watch = require('node-watch');
        watch(path.dirname(sourceFile),{},async (evt,name)=>{
            spinner.start('file change detected! @updating@');
            try {
                await this.presentation.createPresentation(liveUrl,reveal.presentation,options_);
                spinner.succeed('presentation #updated!#');
            } catch(err) {
                spinner.fail('|error rendering update| check source file');
                this.debug('fail to update presentation',err);
            }
        });
        //detect abort process by user
        process.on('SIGINT', async()=>{
            spinner.start('|EXIT detected|! Cleaning tmp files ..');
            //stops tunnel
            if (this.arg.public) {
                /*try {
                    await tunnel.disconnect();
                } catch(errN) {
                }*/
            }
            //clean tmpdir
            await fs.rm(tmpdir, { recursive:true });
            spinner.succeed(`|exit ready!|, @have a nice day!@ ${emoji.get('smile')}`);
            //exit
            this.finish(10);
        });
    }

}