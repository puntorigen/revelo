//generic command class
import helper from './helper'
const prompts = require('prompts')
const helper_ = new helper()

export default class Command {
    x_console: any
    arg: any
    helper_: any
    debug_: boolean
    colorTokens_: colorTokens

    constructor(arg) {
        if (arg.silent) { // --silent
            this.x_console = new (require('@concepto/console'))({ silent:true })
        } else {
            this.x_console = new (require('@concepto/console'))()
        }
        if (arg.debug) {
            this.debug_ = true; // --debug
            this.x_console.out = this.x_console.outT;
        }
        this.arg = {...arg,...{cmd_:'' }} //cmd_ is the 
        if (arg._ && arg._.length > 0) this.arg.cmd_ = arg._[0].toLowerCase()
        this.helper_ = helper_;
    }

    async run() {
        const a = await this.init();        if (a==false) this.finish(1);
        const b = await this.process();     if (b==false) this.finish(2);
        const c = this.finish();
    }

    async init():Promise<any> {
        return true;
    }

    async process():Promise<any> { 
        //this is for the command instance to overwrite
        return true;
    }
    
    finish(exitcode?:number) {
        // closing script
        console.log('\n');
        helper_.copyright()
        if (exitcode) process.exit(exitcode);
    }
    
    async ask(question:string,validation?:any) {
        const resp = (
            await prompts({
                type: 'text',
                name: 'value',
                message: this.x_console.colorize(question),
                validate: (value) => {
                    if (validation) return validation(value);
                    return true
                }
            })
        ).value;
        return resp;
    }

    async choose(question:string, options:options[], selected:number=0) {
        const resp = (
            await prompts({
                type: 'select',
                name: 'value',
                message: this.x_console.colorize(question),
                choices: options,
                initial: selected
            })
        ).value;
        return resp;
    }

    async multi(question:string, options:options[], max:number=0, hint?:string) {
        const resp = (
            await prompts({
                type: 'multiselect',
                name: 'value',
                message: this.x_console.colorize(question),
                choices: options,
                max,
                hint: (hint)?hint:'- Space to select. Return to submit'
            })
        ).value;
        return resp;
    }

    logPrefix(prefix:string,color:colors='yellow'):void {
        let params:any = { prefix,color };
        this.x_console.setPrefix(params)
    }

    log(message:string,color?:colors,data?:any):void {
        let params:any = { message };
        const test = message.toLowerCase();
        if (test.indexOf('error:')!=-1 || test.indexOf('error:')!=-1) params.color = 'brightRed';
        if (data) params.data = data;
        if (color) params.color = color;
        params.message = this.x_console.colorize(params.message);
        this.x_console.out(params);
    }

    debug(message:string,data?:any):void {
        let params:any = { prefix:'debug:'+this.x_console.config.prefix, message, color:'dim' };
        const test = message.toLowerCase();
        if (test.indexOf('error:')!=-1 || test.indexOf('error:')!=-1) params.color = 'brightRed';
        if (data) params.data = data;
        this.x_console.out(params);
    }

    title(title:string,color?:colors,borderColor:colors='white'):void {
        let params:any = { title };
        if (color) params.titleColor = color;
        this.x_console.title(params);
    }

    spinner(color?:colors) {
        let params:any = {};
        if (color) params.color = color;
        return this.x_console.spinner(params);
    }

    setColorTokens(colorTokens:colorTokens) {
        this.x_console.setColorTokens(colorTokens);
    }

 
}

export interface options {
    title:string,
    value:any,
    description?:string
}

export interface validation {
    (value: string): boolean | string;
}

export type colors = 'black'|'red'|'green'|'yellow'|'blue'|'purple'|'cyan'|'white'|'brightRed';

export interface colorTokens {
    '*'?:colors,
    '|'?:colors,
    '@'?:colors,
    '#'?:colors,
    '!'?:colors
}