import Command from '../common/command'

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
        return true;
    }

    async process() {
        let file = '';
        if (this.arg._.length==0) file = await this.ask(`Please enter the filename for the DB backup:`);
        if (this.arg._.length>0) file = this.arg._.shift();
        /*
        const root = require('find-root')(__dirname)
        const path = require('path');
        const source = path.join(root,'db.json')
        const target = path.join(process.cwd(),file);
        const fs = require('fs').promises;
        await fs.copyFile(source,target);
        this.log('DB backup written successfully!','green')*/
    }

}