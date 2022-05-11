export default class Command {
    x_console: any;
    arg: any;
    helper_: any;
    debug_: boolean;
    colorTokens_: colorTokens;
    constructor(arg: any);
    run(): Promise<void>;
    init(): Promise<any>;
    process(): Promise<any>;
    finish(exitcode?: number): void;
    ask(question: string, validation?: any): Promise<any>;
    choose(question: string, options: options[], selected?: number): Promise<any>;
    multi(question: string, options: options[], max?: number, hint?: string): Promise<any>;
    logPrefix(prefix: string, color?: colors): void;
    log(message: string, color?: colors, data?: any): void;
    debug(message: string, data?: any): void;
    title(title: string, color?: colors, borderColor?: colors): void;
    spinner(color?: colors): any;
    setColorTokens(colorTokens: colorTokens): void;
}
export interface options {
    title: string;
    value: any;
    description?: string;
}
export interface validation {
    (value: string): boolean | string;
}
export declare type colors = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'cyan' | 'white' | 'brightRed';
export interface colorTokens {
    '*'?: colors;
    '|'?: colors;
    '@'?: colors;
    '#'?: colors;
    '!'?: colors;
}
//# sourceMappingURL=command.d.ts.map