export default class presentation {
    x_console: any;
    sourceFile: string;
    constructor(sourcefile: any);
    baseReveal(directory: any): Promise<{
        path: string;
        presentation: any;
        file: any;
    }>;
    createPresentation(serverUrl: String, target: String, options: any): Promise<any[]>;
    isObjEmpty(obj: any): boolean;
}
//# sourceMappingURL=presentation.d.ts.map