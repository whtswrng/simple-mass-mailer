import {MassEmailSender} from "./mass-email-sender";
import {NodeMailerTransporter} from "../email-transporter/node-mailer-transporter";
import {Logger} from "../logger/logger";

export class MassEmailSenderFactory {

    public instantiate(poolConfig: string, logger: Logger): MassEmailSender {
        const emailTransporter = new NodeMailerTransporter(poolConfig);
        return new MassEmailSender(emailTransporter, logger);
    }

}