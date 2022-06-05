declare const EventEmitter: any;
export default class presentation extends EventEmitter {
    x_console: any;
    sourceFile: string;
    constructor(sourcefile: any);
    downloadFile(url: any, directory: any): Promise<any>;
    baseReveal(directory: any): Promise<{
        path: string;
        presentation: any;
        file: any;
    }>;
    convertToWebm(mp4: any, output: any): Promise<any>;
    createPresentation(serverUrl: String, target: String, options: any): Promise<any[]>;
    isObjEmpty(obj: any): boolean;
}
export {};
//# sourceMappingURL=presentation.d.ts.map