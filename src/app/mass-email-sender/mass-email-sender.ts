import {EmailTransporter} from "../email-transporter/email-transporter";

export class MassEmailSender {

    constructor(private emailTransporter: EmailTransporter) {

    }

    public async process(recipients: Array<string>, sender: string, message: string): Promise<void> {
        for(const recipient of recipients) {
            await this.sendEmail(sender, recipient, message);
        }
    }

    private async sendEmail(sender: string, recipient: string, message: string): Promise<void> {
        try {
            await this.emailTransporter.send(sender, recipient, message);
        } catch (e) {
            throw new EmailNotSentError(`Could not sent email to ${recipient}, because of: ${e.message}`);
        }
    }
}

export class EmailNotSentError extends Error {

}