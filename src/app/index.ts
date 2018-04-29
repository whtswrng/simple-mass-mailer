import {InputParser} from "./input-parser/input-parser";
import {NodeFileSystem} from "./file-system/node-file-system";
import {Application} from "./application";
import {MassEmailSenderFactory} from "./mass-email-sender/mass-email-sender-factory";
import {BasicLogger} from "./logger/basic-logger";
import {printHelp} from "./help";

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

