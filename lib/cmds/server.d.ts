import Command from '../common/command';
export default class Server extends Command {
    init(): Promise<boolean>;
    createPresentation(): Promise<void>;
    process(): Promise<void>;
}
//# sourceMappingURL=server.d.ts.map