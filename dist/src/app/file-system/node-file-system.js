"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class NodeFileSystem {
    readFile(filePath) {
        return new Promise((resolve, reject) => this.innerReadFile(filePath, resolve, reject));
    }
    innerReadFile(filePath, resolve, reject) {
        fs.readFile(filePath, (err, data) => {
            return err ? reject(err) : resolve(data);
        });
    }
}
exports.NodeFileSystem = NodeFileSystem;
//# sourceMappingURL=node-file-system.js.map