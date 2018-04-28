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
const nodemailer = require("nodemailer");
class NodeMailerTransporter {
    constructor(poolConfig) {
        this.transporter = nodemailer.createTransport(poolConfig);
    }
    send(sender, recipient, message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
                from: sender,
                to: recipient,
                html: message
            });
        });
    }
}
exports.NodeMailerTransporter = NodeMailerTransporter;
//# sourceMappingURL=node-mailer-transporter.js.map