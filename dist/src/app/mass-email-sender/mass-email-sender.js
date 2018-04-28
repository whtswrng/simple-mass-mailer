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
    constructor(emailTransporter, recipients, sender, message) {
        this.emailTransporter = emailTransporter;
        this.recipients = recipients;
        this.sender = sender;
        this.message = message;
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const recipient of this.recipients) {
                yield this.sendEmail(recipient);
            }
        });
    }
    sendEmail(recipient) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.emailTransporter.send(this.sender, recipient, this.message);
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