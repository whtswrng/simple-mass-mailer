import {EmailTransporter} from "../email-transporter/email-transporter";

export class MassEmailSender {

    constructor(private emailTransporter: EmailTransporter, private recipients: Array<string>, private sender: string,
                private message: string) {

    }

    public async process(): Promise<void> {
        for(const recipient of this.recipients) {
            await this.sendEmail(recipient);
        }
    }

    private async sendEmail(recipient) {
        try {
            await this.emailTransporter.send(this.sender, recipient, this.message);
        } catch (e) {
            throw new EmailNotSentError(`Could not sent email to ${recipient}, because of: ${e.message}`);
        }
    }
}

export class EmailNotSentError extends Error {

}