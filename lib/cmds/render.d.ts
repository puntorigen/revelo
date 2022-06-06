import Command from '../common/command';
export default class Render extends Command {
    presentation: any;
    spinner: any;
    targetFile: string;
    targetFormat: string;
    init(): Promise<boolean>;
    createReveal(): Promise<{
        reveal: any;
        meta: any;
    } | {
        reveal: any;
        meta?: undefined;
    }>;
    recordBrowser(url: any, time: any): Promise<void>;
    convertToGif(mp4: any, output: any): Promise<any>;
    process(): Promise<void>;
}
//# sourceMappingURL=render.d.ts.map