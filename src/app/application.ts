import {InputParser} from "./input-parser/input-parser";
import {NodeMailerTransporter} from "./email-transporter/node-mailer-transporter";
import {MassEmailSender} from "./mass-email-sender/mass-email-sender";
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

    private async prepareInput() {
        const sender = this.processArguments[3];
        const poolConfig = this.processArguments[2];
        const recipientsFilePath = this.processArguments[4];
        const emailMessageFilePath = this.processArguments[5];

        await this.inputParser.parse(sender, poolConfig, recipientsFilePath, emailMessageFilePath);
    }

    private async startProcessing () {
        const massEmailSender = this.massEmailSenderFactory.instantiate(this.inputParser.getPoolConfig());
        await massEmailSender.process(
            this.inputParser.getRecipients(), this.inputParser.getSender(), this.inputParser.getMessage()
        );
    }

    private handleError(e): void {
        this.logger.error(e);
    }

}