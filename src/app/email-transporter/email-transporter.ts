export interface EmailTransporter {
    send(sender: string, recipient: string, subject: string, message: string): Promise<void>
}