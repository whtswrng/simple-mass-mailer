import {FileSystem} from "./file-system";
import * as fs from 'fs';

export class NodeFileSystem implements FileSystem{

    public readFile(filePath: string): Promise<string> {
        return new Promise((resolve, reject) => this.innerReadFile(filePath, resolve, reject));
    }

    private innerReadFile(filePath: string, resolve, reject): void {
        fs.readFile(filePath, (err, data) => {
            return err ? reject(err) : resolve(data);
        })
    }
}