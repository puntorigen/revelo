import Command from '../common/command';
export default class Render extends Command {
    presentation: any;
    spinner: any;
    targetFile: string;
    targetFormat: string;
    init(): Promise<boolean>;
    createReveal(): Promise<any>;
    recordBrowser(url: any): Promise<void>;
    process(): Promise<void>;
}
//# sourceMappingURL=render.d.ts.map