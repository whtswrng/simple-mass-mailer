export interface FileSystem {
    readFile(filePath: string): Promise<string>
}