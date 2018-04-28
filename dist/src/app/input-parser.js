"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class InputParser {
    constructor(fs) {
        this.fs = fs;
    }
    setInput(sender, poolConfig, recipientsFilePath, emailMessagePath) {
        this.sender = sender;
        this.poolConfig = poolConfig;
        this.recipientsFilePath = recipientsFilePath;
        this.emailMessagePath = emailMessagePath;
    }
    parse() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.parseRecipients();
            yield this.parseMessageContent();
        });
    }
    parseMessageContent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.messageContent = yield this.fs.readFile(this.emailMessagePath);
            }
            catch (e) {
                this.throwInvalidFileContentError(e, 'message content', this.emailMessagePath);
            }
        });
    }
    parseRecipients() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.recipients = JSON.parse(yield this.fs.readFile(this.recipientsFilePath));
            }
            catch (e) {
                this.throwInvalidFileContentError(e, 'recipients', this.recipientsFilePath);
            }
        });
    }
    throwInvalidFileContentError(e, filePath, subject) {
        throw new InvalidFileContentError(`Error occurred while reading ${subject} from file ${filePath}. Details: ${e.message}`);
    }
    getSender() {
        return this.sender;
    }
    getPoolConfig() {
        return this.poolConfig;
    }
    getMessage() {
        return this.messageContent;
    }
    getRecipients() {
        return this.recipients;
    }
}
exports.InputParser = InputParser;
class InvalidFileContentError extends Error {
}
exports.InvalidFileContentError = InvalidFileContentError;
//# sourceMappingURL=input-parser.js.map