import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {Application} from "./application";
import {InputParser} from "./input-parser/input-parser";
import {MassEmailSender} from "./mass-email-sender/mass-email-sender";
import {Logger} from "./logger/logger";
import {MassEmailSenderFactory} from "./mass-email-sender/mass-email-sender-factory";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Application', () => {

    const poolConfig = 'some pool config';
    const recipients = ['foo@bar.com'];
    const sender = 'Ferda@ad.com';
    const message = 'oh hi mark';
    let application: Application;
    let massEmailSenderFactory: MassEmailSenderFactory;
    let logger: Logger;
    let inputParser;
    let massEmailSender;
    let processArguments;

    beforeEach(() => {
        massEmailSender = {
            process: sinon.stub()
        };
        massEmailSenderFactory = {
            instantiate: sinon.stub().returns(massEmailSender)
        };
        logger = {
            error: sinon.spy(),
            log: sinon.spy()
        };
        inputParser = {
            parse: sinon.stub(),
            getRecipients: sinon.stub().returns(recipients),
            getPoolConfig: sinon.stub().returns(poolConfig),
            getSender: sinon.stub().returns(sender),
            getMessage: sinon.stub().returns(message)
        };
        processArguments = [];
        initialize();
    });

    it('should be properly created', () => {
        expect(application).to.be.instanceof(Application);
    });

    it('should log error if parsing failed', async () => {
        inputParser.parse.rejects(new Error('whatever'));

        await application.start();

        expect(logger.error).to.have.been.calledOnce;
    });

    it('should log error if sending email failed', async () => {
        massEmailSender.process.rejects(new Error('whatever2'));

        await application.start();

        expect(logger.error).to.have.been.calledOnce;
    });

    it('should correctly parsed process arguments', async () => {
        processArguments[2] = 'pool config';
        processArguments[3] = 'sender';
        processArguments[4] = 'recipients file';
        processArguments[5] = 'message file';

        await application.start();

        expect(inputParser.parse).to.have.been.calledWith(
            processArguments[3], processArguments[2], processArguments[4], processArguments[5]
        );
    });

    it('should process emails', async () => {
        await application.start();

        expect(massEmailSenderFactory.instantiate).to.have.been.calledWith(poolConfig);
        expect(massEmailSender.process).to.have.been.calledWith(recipients, sender, message);
    });

    it('should successfully parse process arguments and send email', async () => {
        await application.start();

        expect(logger.error).not.to.have.been.called;
    });

    function initialize() {
        application = new Application(inputParser as any, massEmailSenderFactory as any, processArguments, logger);
    }

});
