import {InputParser} from "./input-parser/input-parser";
import {Logger} from "./logger/logger";
import {MassEmailSenderFactory} from "./mass-email-sender/mass-email-sender-factory";

export class Application {

    constructor(private inputParser: InputParser, private massEmailSenderFactory: MassEmailSenderFactory,
                private processArguments: Array<string>, private logger: Logger) {

    }

    public async start(): Promise<void> {
        try {
            await this.prepareInput();
            await this.startProcessing();
        } catch (e) {
            this.handleError(e);
        }
    }

    private async prepareInput(): Promise<void> {
        const poolConfig = this.processArguments[2];
        const sender = this.processArguments[3];
        const subject = this.processArguments[4];
        const recipientsFilePath = this.processArguments[5];
        const emailMessageFilePath = this.processArguments[6];

        await this.inputParser.parse(poolConfig, sender, subject, recipientsFilePath, emailMessageFilePath);
    }

    private async startProcessing (): Promise<void> {
        const massEmailSender = this.massEmailSenderFactory.instantiate(this.inputParser.getPoolConfig(), this.logger);
        await massEmailSender.process(
            this.inputParser.getRecipients(), this.inputParser.getSender(), this.inputParser.getSubject(),
            this.inputParser.getMessage()
        );
    }

    private handleError(e): void {
        this.logger.error(e);
    }

}