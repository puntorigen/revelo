export default class presentation {
    x_console: any;
    sourceFile: string;
    constructor(sourcefile: any);
    baseReveal(directory: any): Promise<{
        path: string;
        presentation: any;
        file: any;
    }>;
    createPresentation(target: String, options?: {
        fragments: boolean;
    }): Promise<void>;
    isObjEmpty(obj: any): boolean;
}
//# sourceMappingURL=presentation.d.ts.map