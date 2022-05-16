import Command from '../common/command'
import Helper from '../common/helper'
import Presentation from '../common/presentation'
import ansi from 'ansi-escapes'

const fs = require('fs').promises;
const path = require('path');
const emoji = require('node-emoji');
const helper = new Helper();
const promisify = require('util').promisify;
let firstReveal = '';
let sourceFile = '', tmpdir = '';
let slides:any = {};

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
        if (this.arg._.length==0) file = await this.ask(`Please enter the filename for the DB backup:`);
        if (this.arg._.length>0) file = this.arg._.shift();
        sourceFile = path.join(process.cwd(),file);
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
        spinner.start('preparing presentation ..');
        const reveal = await this.presentation.baseReveal(tmpdir);
        //console.log(reveal);
        spinner.succeed('prepared');
        spinner.start('generating presentation');
        await this.presentation.createPresentation(reveal.presentation,{ fragments:true });
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
        const serverLink = ansi.link('http://127.0.0.1:3000','http://127.0.0.1:3000');
        spinner.succeed(`server listening on #${serverLink}#`);
        //open browser
        const open = require('open');
        await open('http://127.0.0.1:3000')
        //monitor given md file changes
        const watch = require('node-watch');
        watch(path.dirname(sourceFile),{},async (evt,name)=>{
            spinner.start('file change detected! @updating@');
            try {
                await this.presentation.createPresentation(reveal.presentation);
                spinner.succeed('presentation #updated!#');
            } catch(err) {
                spinner.fail('|error rendering update| check source file');
            }
        });
        //detect abort process by user
        process.on('SIGINT', async()=>{
            //clean tmpdir
            spinner.start('|EXIT detected|! Cleaning tmp files ..');
            await fs.rm(tmpdir, { recursive:true });
            spinner.succeed(`|exit ready!|, @have a nice day!@ ${emoji.get('smile')}`);
            //exit
            this.finish(10);
        });
    }

}