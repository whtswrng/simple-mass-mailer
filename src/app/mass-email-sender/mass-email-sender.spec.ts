import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {EmailNotSentError, MassEmailSender} from "./mass-email-sender";
import {EmailTransporter} from "../email-transporter/email-transporter";
import {Logger} from "../logger/logger";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('MassEmailSender', () => {

    const recipients = ['foo@bar.com', 'blub@blob.com'];
    const message = 'hello';
    const subject = 'subject';
    const sender = 'senderEmail@bobo.com';
    let massEmailSender: MassEmailSender;
    let logger: Logger;
    let emailTransporter;

    beforeEach((() => {
        logger = {
            log: sinon.spy(),
            error: sinon.spy()
        };
        emailTransporter = {
            send: sinon.spy()
        } as EmailTransporter;
        massEmailSender = new MassEmailSender(emailTransporter, logger);
    }));

    it('should be properly created', () => {
        expect(massEmailSender).to.be.instanceof(MassEmailSender);
    });

    it('should send emails for given recipients', async () => {
        await massEmailSender.process(recipients, sender, subject, message);

        for(const recipient of recipients) {
            expect(emailTransporter.send).to.have.been.calledWith(sender, recipient, subject, message);
        }
    });

    it('should log about successfully sent message', async () => {
        await massEmailSender.process(['fofo@ad.com'], sender, subject, message);

        expect(logger.log).to.have.been.calledOnce;
    });


    it('should throw error if could not sent email', async () => {
        emailTransporter.send = sinon.stub().rejects(new Error('hups'));

        await expect(massEmailSender.process(recipients, sender, subject, message))
            .to.have.been.rejectedWith(EmailNotSentError, recipients[0]);
    });

});
