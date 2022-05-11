import Command from '../common/command'
const marked = require('marked').marked;
const fs = require('fs').promises;
let sourceFile = '';

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
        const path = require('path');
        const fs = require('fs').promises;
        sourceFile = path.join(process.cwd(),file);
        try {
            await fs.stat(sourceFile)
            return true;
        } catch {
            this.log(`Error: the given file doesn't exist`);
            return false;
        }
    }

    async createPresentation() {
        const mdSource = await fs.readFile(sourceFile,{ encoding:'utf-8' });
        let parsed = marked.lexer(mdSource);
        console.log(parsed);
    }

    async process() {
        await this.createPresentation();
        /*
        const root = require('find-root')(__dirname)
        const source = path.join(root,'db.json')
        await fs.copyFile(source,target);
        this.log('DB backup written successfully!','green')*/
    }

}