export declare const command: (desc: String, usage: usage[], signature?: any) => (target: Object, key: string, descriptor: PropertyDescriptor) => void;
export declare const cli: (constructor: Function) => void;
interface usage {
    [index: number]: string | validation | validationError | validationPrompt;
}
interface validation {
    required: string;
    options?: any;
    arg?: string | '_';
    env?: string;
    type?: 'text' | 'password' | 'list';
}
interface validationError {
    error: string;
    arg?: string | '_';
    env?: string;
    type?: 'text' | 'password' | 'list';
}
interface validationPrompt {
    prompt: string;
    default?: string;
    arg?: string | '_';
    env?: string;
    type?: 'text' | 'password' | 'list';
}
export {};
//# sourceMappingURL=decorators.d.ts.map