import {MassEmailSender} from "./mass-email-sender/mass-email-sender";
import {InputParser} from "./input-parser";
import {NodeFileSystem} from "./file-system/node-file-system";
import {NodeMailerTransporter} from "./email-transporter/node-mailer-transporter";

const fileSystem = new NodeFileSystem();
const inputParser = new InputParser(fileSystem);

start();

async function start() {
    try {
        await prepareInput();
        await startProcessing();
    } catch (e) {
        handleError(e);
    }
}

async function prepareInput() {
    const sender = process.argv[2];
    const poolConfig = process.argv[2];
    const recipientsFilePath = process.argv[3];
    const emailMessageFilePath = process.argv[4];

    inputParser.setInput(sender, poolConfig, recipientsFilePath, emailMessageFilePath);
    await inputParser.parse();
}

async function startProcessing () {
    const emailTransporter = new NodeMailerTransporter(inputParser.getPoolConfig());
    const massEmailSender = new MassEmailSender(
        emailTransporter, inputParser.getRecipients(), inputParser.getSender(), inputParser.getMessage()
    );

    await massEmailSender.process();
}

function handleError(e): void {
    console.log(e);
}
