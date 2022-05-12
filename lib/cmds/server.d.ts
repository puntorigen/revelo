import Command from '../common/command';
export default class Server extends Command {
    init(): Promise<boolean>;
    baseReveal(): Promise<{
        path: string;
        presentation: any;
        file: any;
    }>;
    createPresentation(target: String): Promise<void>;
    process(): Promise<void>;
}
//# sourceMappingURL=server.d.ts.map