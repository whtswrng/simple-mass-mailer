"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class MassEmailSender {
    constructor(emailTransporter, logger) {
        this.emailTransporter = emailTransporter;
        this.logger = logger;
    }
    process(recipients, sender, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const recipient of recipients) {
                yield this.sendEmail(sender, recipient, subject, message);
            }
        });
    }
    sendEmail(sender, recipient, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.emailTransporter.send(sender, recipient, subject, message);
                this.logger.log(`Message to ${recipient} was sent.`);
            }
            catch (e) {
                throw new EmailNotSentError(`Could not sent email to ${recipient}, because of: ${e.message}`);
            }
        });
    }
}
exports.MassEmailSender = MassEmailSender;
class EmailNotSentError extends Error {
}
exports.EmailNotSentError = EmailNotSentError;
//# sourceMappingURL=mass-email-sender.js.map