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
    parse(poolConfig, sender, subject, recipientsFilePath, emailMessagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            this.setInput(sender, subject, poolConfig, recipientsFilePath, emailMessagePath);
            yield this.parseRecipients();
            yield this.parseMessageContent();
        });
    }
    setInput(sender, subject, poolConfig, recipientsFilePath, emailMessagePath) {
        this.sender = sender;
        this.subject = subject;
        this.poolConfig = poolConfig;
        this.recipientsFilePath = recipientsFilePath;
        this.emailMessagePath = emailMessagePath;
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
    throwInvalidFileContentError(e, subject, filePath) {
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
    getSubject() {
        return this.subject;
    }
}
exports.InputParser = InputParser;
class InvalidFileContentError extends Error {
}
exports.InvalidFileContentError = InvalidFileContentError;
//# sourceMappingURL=input-parser.js.map