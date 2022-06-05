import Command from '../common/command'
//import Helper from '../common/helper'
import Presentation from '../common/presentation'

const fs = require('fs').promises;
const path = require('path');
const emoji = require('node-emoji');
//const helper = new Helper();
const promisify = require('util').promisify;
let sourceFile = '', tmpdir = '';

//generated a Export file (PPT,keynote etc) from the given text presentation
export default class Export extends Command {
    presentation: any
    targetFile: string
    targetFormat: string

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
        if (this.arg.output && this.arg.output!='') {
            this.targetFile = path.join(process.cwd(),this.arg.output);
            this.targetFormat = this.arg.output.split('.').pop().toLowerCase().trim();
        }
        if (file=='' || sourceFile=='') {
            this.x_console.out({ message:`|Error! No file given! Bye bye!|` });
            await this.finish(304);
        }
        if (!['mp4'].includes(this.targetFormat)) {
            this.log(`Error: the given output file extension (*.${this.targetFormat}*) is not currently supported (only: @.mp4@)`);
            return false;
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

    async createReveal() {
        const spinner = this.x_console.spinner();
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
            let warnings = await this.presentation.createPresentation('',reveal.presentation,options_);
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
        return reveal;
    }

    async process() {
        if (this.targetFormat=='mp4') {
            //generate presentation (@todo add console.logs to reveal code to capture start/end using puppeteer)
            const reveal = await this.createReveal();
            //start local server
            let express = require('express'), app = express();
            app.use(express['static'](reveal.path));
            app.use(express['static'](path.dirname(sourceFile))); //add md file within / public path as well (for assets)
            app.listen(3000);
            //record browser session

        }
        //const spinner = this.x_console.spinner();
    }

}