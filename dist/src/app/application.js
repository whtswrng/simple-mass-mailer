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
class Application {
    constructor(inputParser, massEmailSenderFactory, processArguments, logger) {
        this.inputParser = inputParser;
        this.massEmailSenderFactory = massEmailSenderFactory;
        this.processArguments = processArguments;
        this.logger = logger;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prepareInput();
                yield this.startProcessing();
            }
            catch (e) {
                this.handleError(e);
            }
        });
    }
    prepareInput() {
        return __awaiter(this, void 0, void 0, function* () {
            const poolConfig = this.processArguments[2];
            const sender = this.processArguments[3];
            const subject = this.processArguments[4];
            const recipientsFilePath = this.processArguments[5];
            const emailMessageFilePath = this.processArguments[6];
            yield this.inputParser.parse(poolConfig, sender, subject, recipientsFilePath, emailMessageFilePath);
        });
    }
    startProcessing() {
        return __awaiter(this, void 0, void 0, function* () {
            const massEmailSender = this.massEmailSenderFactory.instantiate(this.inputParser.getPoolConfig(), this.logger);
            yield massEmailSender.process(this.inputParser.getRecipients(), this.inputParser.getSender(), this.inputParser.getSubject(), this.inputParser.getMessage());
        });
    }
    handleError(e) {
        this.logger.error(e);
    }
}
exports.Application = Application;
//# sourceMappingURL=application.js.map