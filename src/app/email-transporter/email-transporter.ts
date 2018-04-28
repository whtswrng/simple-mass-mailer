export interface EmailTransporter {
    send(sender: string, recipient: string, message: string): Promise<void>
}