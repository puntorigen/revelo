import Command from '../common/command'
//import Helper from '../common/helper'
import Presentation from '../common/presentation'

const fs = require('fs').promises;
const path = require('path');
const emoji = require('node-emoji');
//const helper = new Helper();
const promisify = require('util').promisify;
let sourceFile = '', tmpdir = '';

//generated a Export file (PDF,MP4,GIF,PPT) from the given text presentation
export default class Export extends Command {
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

    }

}