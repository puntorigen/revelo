import Command from '../common/command';
export default class Export extends Command {
    presentation: any;
    targetFile: string;
    targetFormat: string;
    init(): Promise<boolean>;
    createReveal(): Promise<any>;
    process(): Promise<void>;
}
//# sourceMappingURL=export.d.ts.map