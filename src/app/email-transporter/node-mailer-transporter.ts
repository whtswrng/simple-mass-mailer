import {EmailTransporter} from "./email-transporter";
import {Transporter} from "nodemailer";
import * as nodemailer from 'nodemailer';

export class NodeMailerTransporter implements EmailTransporter {
    private transporter: Transporter;

    constructor(poolConfig: string) {
        this.transporter = nodemailer.createTransport(poolConfig);
    }

    public async send(sender: string, recipient: string, message: string): Promise<void> {
        await this.transporter.sendMail({
            from: sender,
            to: recipient,
            html: message
        });
    }

}