import {EmailTransporter} from "../email-transporter/email-transporter";
import {Logger} from "../logger/logger";

export class MassEmailSender {

    constructor(private emailTransporter: EmailTransporter, private logger: Logger) {

    }

    public async process(recipients: Array<string>, sender: string, subject: string, message: string): Promise<void> {
        for(const recipient of recipients) {
            await this.sendEmail(sender, recipient, subject, message);
        }
    }

    private async sendEmail(sender: string, recipient: string, subject: string, message: string): Promise<void> {
        try {
            await this.emailTransporter.send(sender, recipient, subject, message);
            this.logger.log(`Message to ${recipient} was sent.`);
        } catch (e) {
            throw new EmailNotSentError(`Could not sent email to ${recipient}, because of: ${e.message}`);
        }
    }
}

export class EmailNotSentError extends Error {

}