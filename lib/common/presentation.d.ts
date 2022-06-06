export default class presentation {
    x_console: any;
    sourceFile: string;
    constructor(sourcefile: any);
    downloadFile(url: any, directory: any): Promise<any>;
    baseReveal(directory: any): Promise<{
        path: string;
        presentation: any;
        file: any;
    }>;
    convertToWebm(mp4: any, output: any, fps?: number): Promise<any>;
    createPresentation(serverUrl: String, target: String, options: any, spinner?: any): Promise<{
        warnings: any[];
        meta: {
            numSlides: number;
            slides: any[];
            totalTime: number;
        };
    }>;
    isObjEmpty(obj: any): boolean;
}
//# sourceMappingURL=presentation.d.ts.map