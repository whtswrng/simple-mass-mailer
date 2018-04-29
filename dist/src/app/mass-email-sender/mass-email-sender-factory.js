"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mass_email_sender_1 = require("./mass-email-sender");
const node_mailer_transporter_1 = require("../email-transporter/node-mailer-transporter");
class MassEmailSenderFactory {
    instantiate(poolConfig, logger) {
        const emailTransporter = new node_mailer_transporter_1.NodeMailerTransporter(poolConfig);
        return new mass_email_sender_1.MassEmailSender(emailTransporter, logger);
    }
}
exports.MassEmailSenderFactory = MassEmailSenderFactory;
//# sourceMappingURL=mass-email-sender-factory.js.map