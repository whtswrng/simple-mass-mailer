import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {EmailNotSentError, MassEmailSender} from "./mass-email-sender";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('MassEmailSender', () => {

    const recipients = ['foo@bar.com', 'blub@blob.com'];
    const message = 'hello';
    let massEmailSender: MassEmailSender;
    let emailTransporter;

    beforeEach((() => {
        emailTransporter = {
            send: sinon.spy()
        };
        massEmailSender = new MassEmailSender(emailTransporter, recipients, message);
    }));

    it('should be properly created', () => {
        expect(massEmailSender).to.be.instanceof(MassEmailSender);
    });
    
    it('should send emails for given recipients', async () => {
        await massEmailSender.process();

        for(const recipient of recipients) {
            expect(emailTransporter.send).to.have.been.calledWith(recipient, message);
        }
    });

    it('should throw error if could not sent email', async () => {
        emailTransporter.send = sinon.stub().rejects(new Error('hups'));

        await expect(massEmailSender.process()).to.have.been.rejectedWith(EmailNotSentError, recipients[0]);
    });

});
