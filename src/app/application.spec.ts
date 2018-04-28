import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {Application} from "./application";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Application', () => {

    let application: Application;

    beforeEach((() => {
        application = new Application();
    }));

    it('should be properly created', () => {
        expect(application).to.be.instanceof(Application);
    });

});
