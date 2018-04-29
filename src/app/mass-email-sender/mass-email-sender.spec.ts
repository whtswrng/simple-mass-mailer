import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {EmailNotSentError, MassEmailSender} from "./mass-email-sender";
import {EmailTransporter} from "../email-transporter/email-transporter";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('MassEmailSender', () => {

    const recipients = ['foo@bar.com', 'blub@blob.com'];
    const message = 'hello';
    const sender = 'senderEmail@bobo.com';
    let massEmailSender: MassEmailSender;
    let emailTransporter;

    beforeEach((() => {
        emailTransporter = {
            send: sinon.spy()
        } as EmailTransporter;
        massEmailSender = new MassEmailSender(emailTransporter);
    }));

    it('should be properly created', () => {
        expect(massEmailSender).to.be.instanceof(MassEmailSender);
    });
    
    it('should send emails for given recipients', async () => {
        await massEmailSender.process(recipients, sender, message);

        for(const recipient of recipients) {
            expect(emailTransporter.send).to.have.been.calledWith(sender, recipient, message);
        }
    });

    it('should throw error if could not sent email', async () => {
        emailTransporter.send = sinon.stub().rejects(new Error('hups'));

        await expect(massEmailSender.process(recipients, sender, message))
            .to.have.been.rejectedWith(EmailNotSentError, recipients[0]);
    });

});
