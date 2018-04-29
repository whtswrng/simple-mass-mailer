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
const input_parser_1 = require("./input-parser/input-parser");
const node_file_system_1 = require("./file-system/node-file-system");
const application_1 = require("./application");
const mass_email_sender_factory_1 = require("./mass-email-sender/mass-email-sender-factory");
const basic_logger_1 = require("./logger/basic-logger");
var EXIT_CODE;
(function (EXIT_CODE) {
    EXIT_CODE[EXIT_CODE["OK"] = 0] = "OK";
    EXIT_CODE[EXIT_CODE["ERROR"] = 1] = "ERROR";
})(EXIT_CODE || (EXIT_CODE = {}));
const fileSystem = new node_file_system_1.NodeFileSystem();
const inputParser = new input_parser_1.InputParser(fileSystem);
const massEmailSenderFactory = new mass_email_sender_factory_1.MassEmailSenderFactory();
const logger = new basic_logger_1.BasicLogger();
const application = new application_1.Application(inputParser, massEmailSenderFactory, process.argv, logger);
init();
function init() {
    if (process.argv[2] === '-h' || process.argv[2] === '--help') {
        printHelp();
    }
    else {
        startApplication();
    }
}
function printHelp() {
    console.log('Usage:');
    console.log('       cli-mailer <smtps://username:password@smtp.example.com/?pool=true> <sender@email.address.com> <subject> <recipients-path.json> <message-path> ');
    console.log('\nExamples:');
    console.log('       cli-mailer smtps://thomas47:password47@smtp.gmail.com/?pool=true thomas47@gmail.com "Email subject" ./recipients.json ./message.txt');
    console.log('\nContent of "recipients.json":');
    console.log('       ["thomas.johnes@gmail.com", "mark.zuckerberg@facebook.com", "elon.musk@tesla.com"]');
    console.log('\nContent of "message.txt":');
    console.log('       <strong>Hello!</strong></br>');
    console.log('        How are u today?');
}
function startApplication() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield application.start();
            process.exit(EXIT_CODE.OK);
        }
        catch (e) {
            handleError(e);
        }
    });
}
function handleError(e) {
    console.log('Unhandled exception in application!');
    console.log(e);
    process.exit(EXIT_CODE.ERROR);
}
//# sourceMappingURL=index.js.map