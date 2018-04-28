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
const mass_email_sender_1 = require("./mass-email-sender/mass-email-sender");
const input_parser_1 = require("./input-parser");
const node_file_system_1 = require("./file-system/node-file-system");
const node_mailer_transporter_1 = require("./email-transporter/node-mailer-transporter");
const fileSystem = new node_file_system_1.NodeFileSystem();
const inputParser = new input_parser_1.InputParser(fileSystem);
start();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prepareInput();
            yield startProcessing();
        }
        catch (e) {
            handleError(e);
        }
    });
}
function prepareInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const sender = process.argv[3];
        const poolConfig = process.argv[2];
        const recipientsFilePath = process.argv[4];
        const emailMessageFilePath = process.argv[5];
        console.log(poolConfig);
        inputParser.setInput(sender, poolConfig, recipientsFilePath, emailMessageFilePath);
        yield inputParser.parse();
    });
}
function startProcessing() {
    return __awaiter(this, void 0, void 0, function* () {
        const emailTransporter = new node_mailer_transporter_1.NodeMailerTransporter(inputParser.getPoolConfig());
        const massEmailSender = new mass_email_sender_1.MassEmailSender(emailTransporter, inputParser.getRecipients(), inputParser.getSender(), inputParser.getMessage());
        yield massEmailSender.process();
    });
}
function handleError(e) {
    console.log(e);
}
//# sourceMappingURL=index.js.map