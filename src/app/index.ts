import {InputParser} from "./input-parser/input-parser";
import {NodeFileSystem} from "./file-system/node-file-system";
import {Application} from "./application";
import {MassEmailSenderFactory} from "./mass-email-sender/mass-email-sender-factory";
import {BasicLogger} from "./logger/basic-logger";

enum EXIT_CODE {
    OK = 0,
    ERROR = 1
}

const fileSystem = new NodeFileSystem();
const inputParser = new InputParser(fileSystem);
const massEmailSenderFactory = new MassEmailSenderFactory();
const logger = new BasicLogger();

const application = new Application(inputParser, massEmailSenderFactory, process.argv, logger);

init();

function init() {
    if(process.argv[2] === '-h' || process.argv[2] === '--help') {
        printHelp();
    } else {
        startApplication();
    }
}

function printHelp() {
    console.log('Usage:');
    console.log('       cli-mailer <smtps://username:password@smtp.example.com/?pool=true> <sender@email.address.com> <subject> <recipients-path.json> <message-path> ');
    console.log('\nExamples:');
    console.log('       cli-mailer smtps://thomas47:password47@smtp.gmail.com/?pool=true thomas47@gmail.com "Email subject" ./recipients.json ./message.txt')
    console.log('\nContent of "recipients.json":');
    console.log('       ["thomas.johnes@gmail.com", "mark.zuckerberg@facebook.com", "elon.musk@tesla.com"]');
    console.log('\nContent of "message.txt":');
    console.log('       <strong>Hello!</strong></br>');
    console.log('        How are u today?');
}

async function startApplication() {
    try {
        await application.start();
        process.exit(EXIT_CODE.OK);
    } catch (e) {
        handleError(e);
    }
}

function handleError(e) {
    console.log('Unhandled exception in application!');
    console.log(e);
    process.exit(EXIT_CODE.ERROR);
}

