import {NodeFileSystem} from "./file-system/node-file-system";
import {InputParser} from "./input-parser/input-parser";
import {NodeMailerTransporter} from "./email-transporter/node-mailer-transporter";
import {MassEmailSender} from "./mass-email-sender/mass-email-sender";
import {FileSystem} from "./file-system/file-system";
import {EmailTransporter} from "./email-transporter/email-transporter";

export class Application {

    constructor(private fileSystem: FileSystem, private inputParser: InputParser,
                private emailTransporter: EmailTransporter, private massEmailSender: MassEmailSender,
                private processArguments: Array<string>) {

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

        console.log(poolConfig)
        this.inputParser.setInput(sender, poolConfig, recipientsFilePath, emailMessageFilePath);
        await this.inputParser.parse();
    }

    private async startProcessing () {
        const emailTransporter = new NodeMailerTransporter(this.inputParser.getPoolConfig());
        const massEmailSender = new MassEmailSender(
            emailTransporter, this.inputParser.getRecipients(), this.inputParser.getSender(),
            this.inputParser.getMessage()
        );

        await massEmailSender.process();
    }

    private handleError(e): void {
        console.log(e);
    }

}