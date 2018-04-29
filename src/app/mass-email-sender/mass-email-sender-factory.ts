import {MassEmailSender} from "./mass-email-sender";
import {NodeMailerTransporter} from "../email-transporter/node-mailer-transporter";

export class MassEmailSenderFactory {

    public instantiate(poolConfig: string): MassEmailSender {
        const emailTransporter = new NodeMailerTransporter(poolConfig);
        return new MassEmailSender(emailTransporter);
    }

}