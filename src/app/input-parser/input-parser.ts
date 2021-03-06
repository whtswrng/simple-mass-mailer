import {FileSystem} from "../file-system/file-system";

export class InputParser {

    private recipientsFilePath: string;
    private emailMessagePath: string;
    private recipients: Array<string>;
    private subject: string;
    private sender: string;
    private poolConfig: string;
    private messageContent: string;

    constructor(private fs: FileSystem) {

    }

    public async parse(poolConfig: string, sender: string, subject: string, recipientsFilePath: string,
                       emailMessagePath: string): Promise<void> {
        this.setInput(sender, subject, poolConfig, recipientsFilePath, emailMessagePath);
        await this.parseRecipients();
        await this.parseMessageContent();
    }

    private setInput(sender: string, subject: string, poolConfig: string, recipientsFilePath: string, emailMessagePath: string): void {
        this.sender = sender;
        this.subject = subject;
        this.poolConfig = poolConfig;
        this.recipientsFilePath = recipientsFilePath;
        this.emailMessagePath = emailMessagePath;
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

    private throwInvalidFileContentError(e, subject: string, filePath: string): void {
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

    public getSubject(): string {
        return this.subject;
    }

}

export class InvalidFileContentError extends Error {

}
