//decorators
import helper from './helper'
const helper_ = new helper()
const prompts = require('prompts')
const x_console = new (require('@concepto/console'))()
require('dotenv').config()

let ref = {};
//@todo read this from a theme.json file
x_console.setColorTokens({
    '*':'yellow',
    '#':'cyan',
    '@':'green'
});

const finish = (exitcode?:number) => {
    // closing script
    console.log('\n');
    helper_.copyright();
    if (exitcode) process.exit(exitcode);
    process.exit();
};

export const command = (desc: String, usage: usage[], signature: any = '') =>
(target: Object, key: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value
    descriptor.value = async function (...args) {
        //let usage = target[key+'_usage']();
        if (!this.usage) this.usage = {}
        if (!this.commands) this.commands = {}
        if (!this.signatures) this.signatures = {}
        this.usage[key] = usage //declare it for CLI knowledge
        this.commands[key] = desc //declare it for CLI knowledge
        this.usage[key+':validation'] = {} //declare it for CLI knowledge
        ref[key] = {};
        if (signature == '' && usage && usage.length > 0) {
            this.signatures[key] = '[options]' //default value when there are options
        } else {
            this.signatures[key] = signature //assigned given value
        }
        //modify/normalize args before calling original method
        let norm = args[0] //cmdline args
        let cmd_ = (norm._)?norm._[0]:"";
        if (!('_init' in norm)) { //
            norm._.shift() // remove command name
            for (let option of usage) {
                let aliases: any = option
                let short = option[0][1] //first char
                //console.log('deco '+key+' dump',{aliases,short,usage,option});
                if (short != '-') {
                    aliases.shift() // remove short from aliases
                    let main = aliases.shift().replace('--', '')
                    aliases.shift() // remove desc
                    if (aliases.length>0 && typeof aliases[0] === 'object') {
                        ref[key][main]=aliases[0];
                        //console.log('deco dump '+key+' usage',{ option, aliases });
                        aliases.pop() // remove validation
                    }
                    if (norm[short]) {
                        norm[main] = norm[short] // assign value to 'main' property name
                        delete norm[short] //erases short type
                    }
                    // assign all posible combinations to main from norm
                    for (let ori in norm) {
                        if (ori != '_' && aliases.includes(ori)) {
                            if (norm[ori]) {
                                norm[main] = norm[ori]
                                delete norm[ori]
                            }
                        }
                    }
                }
            }
            //debug
            //console.log('debug cli '+key+' usage',{usage:this.usage[key], raw_args:args[0], norm,ref });
            //prompt for missing key values
            for (let req in ref[key]) {
                if (!(req in norm)) {
                    if (ref[key][req].error && ref[key][req].error!='') {
                        //required file was not given and error message specified to halt process
                        if (ref[key][req].arg && norm[ref[key][req].arg]) {
                            const other_ = norm[ref[key][req].arg];
                            if (ref[key][req].arg=='_') {
                                if (other_.length>0) {
                                    norm[req] = other_[0];
                                } else {
                                    x_console.out({
                                        message: x_console.colorize(ref[key][req].error),
                                        color: 'brightRed'
                                    })
                                    finish(20);
                                }
                            } else {
                                norm[req] = other_;
                            }
                        } else if (ref[key][req].arg) {
                            x_console.out({
                                message: x_console.colorize(ref[key][req].error),
                                color: 'brightRed'
                            })
                            finish(20);
                        }
                    
                    } else if (ref[key][req].prompt && ref[key][req].prompt!='') {
                        // prompt for optional value, if not specified
                        try {                        
                            if (!norm[req]) {
                                norm[req] = (await prompts({
                                    type: (ref[key][req].type)?ref[key][req].type:'text',
                                    name: 'value',
                                    message: x_console.colorize(ref[key][req].prompt)
                                })).value;
                                if (!norm[req] && ref[key][req].default && ref[key][req].default !='') norm[req] = ref[key][req].default;
                            }
                        } catch(err) {
                            x_console.out({ message:'error prompt', data:err });
                        }

                    //required field was not given
                    } else if (ref[key][req].required && ref[key][req].required!='') {
                        //test if arg key is defined; if so test existance (alias)
                        if (ref[key][req].arg && norm[ref[key][req].arg]) {
                            const other_ = norm[ref[key][req].arg];
                            if (ref[key][req].arg=='_') {
                                if (other_.length>0) {
                                    norm[req] = other_[0];
                                } else {
                                    norm[req] = (await prompts({
                                        type: (ref[key][req].type)?ref[key][req].type:'text',
                                        name: 'value',
                                        message: x_console.colorize(ref[key][req].required)
                                    })).value;
                                    if (!norm[req]) finish(20);
                                }
                            } else {
                                norm[req] = other_;
                            }
                        } else if (ref[key][req].arg) {
                            norm[req] = (await prompts({
                                type: (ref[key][req].type)?ref[key][req].type:'text',
                                name: 'value',
                                message: x_console.colorize(ref[key][req].required)
                            })).value;
                            if (!norm[req]) finish(20);
                        }
                        //test if ENV key is defined; if so assign it
                        if (ref[key][req].env && process.env[ref[key][req].env]) {
                            norm[req] = process.env[ref[key][req].env];
                        }
                        //if not, prompt for missing info (simple value)
                        if (!(req in norm) && !ref[key][req].options) {
                            norm[req] = (await prompts({
                                type: (ref[key][req].type)?ref[key][req].type:'text',
                                name: 'value',
                                message: x_console.colorize(ref[key][req].required)
                            })).value;
                            if (!norm[req]) finish(20);
                        }
                        //if not, maybe its a selection type question
                        if (!(req in norm) && ref[key][req].options) {
                            norm[req] = (await prompts({
                                    type: 'select',
                                    name: 'value',
                                    message: x_console.colorize(ref[key][req].required),
                                    choices: ref[key][req].options
                            })).value;
                            if (!norm[req]) finish(20);
                        }
                    }
                } 
            }
            //console.log('new args',norm);
            //console.log('');
            //call original method (only if not from constructor initialization)
            original.apply(this, [norm]) 
        }
    }
}

export const cli = (constructor: Function) => {
    constructor.prototype.usage = {};
    constructor.prototype.commands = {};

    for (const method in constructor.prototype) {
        if (!['usage','commands'].includes(method)) {
            constructor.prototype[method]({ _init: true })
        }
    }
    
}

interface usage {
    [index: number]: string | validation | validationError | validationPrompt
}

interface validation {
    required: string,
    options?: any,
    arg?: string|'_',
    env?: string,
    type?: 'text'|'password'|'list'
}

interface validationError {
    error: string,
    arg?: string|'_',
    env?: string,
    type?: 'text'|'password'|'list'
}

interface validationPrompt {
    prompt: string,
    default?: string,
    arg?: string|'_',
    env?: string,
    type?: 'text'|'password'|'list'
}