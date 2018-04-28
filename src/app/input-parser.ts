import {FileSystem} from "./file-system/file-system";

export class InputParser {

    private recipientsFilePath: string;
    private emailMessagePath: string;
    private recipients: Array<string>;
    private sender: string;
    private poolConfig: string;
    private messageContent: string;

    constructor(private fs: FileSystem) {

    }

    public setData(sender: string, poolConfig: string, recipientsFilePath: string, emailMessagePath: string): void {
        this.sender = sender;
        this.poolConfig = poolConfig;
        this.recipientsFilePath = recipientsFilePath;
        this.emailMessagePath = emailMessagePath;
    }

    public async parse(): Promise<void> {
        await this.parseRecipients();
        await this.parseMessageContent();
    }

    private async parseMessageContent(): Promise<void> {
        try {
            this.messageContent = await this.fs.readFile(this.emailMessagePath)
        } catch (e) {
            this.throwInvalidFileContentError(e, 'message content', this.emailMessagePath);
        }
    }

    private async parseRecipients(): Promise<void> {
        try {
            this.recipients = JSON.parse(await this.fs.readFile(this.recipientsFilePath));
        } catch (e) {
            this.throwInvalidFileContentError(e, 'recipients', this.recipientsFilePath);
        }
    }

    private throwInvalidFileContentError(e, filePath: string, subject: string): void {
        throw new InvalidFileContentError(
            `Error occurred while reading ${subject} from file ${filePath}. Details: ${e.message}`
        )
    }

    public getSender(): string {
        return this.sender;
    }

    public getPoolConfig(): string {
        return this.poolConfig;
    }

    public getMessage(): string {
        return this.messageContent;
    }

    public getRecipients(): Array<string> {
        return this.recipients;
    }

}

export class InvalidFileContentError extends Error {

}
