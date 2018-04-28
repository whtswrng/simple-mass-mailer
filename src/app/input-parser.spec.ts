import {expect} from 'chai';
import * as mocha from 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import {InputParser, InvalidFileContentError} from "./input-parser";
import {FileSystem} from "./file-system/file-system";
import {SinonStub} from "sinon";

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('InputParser', () => {

    const sender = 'foo@foo.com';
    const recipients = ['blab@bla.com'];
    const recipientsFilePath = 'foo bar baz';
    const emailMessagePath = 'email message';
    const poolConfig = 'smtps://user:pasd@asd.google.com';
    let inputParser: InputParser;
    let fs;
    let readFileStub: SinonStub;

    beforeEach((() => {
        readFileStub = sinon.stub();
        fs = {
            readFile: readFileStub
        } as FileSystem;
        inputParser = new InputParser(fs);
        inputParser.setInput(sender, poolConfig, recipientsFilePath, emailMessagePath);
    }));

    it('should be properly created', () => {
        expect(inputParser).to.be.instanceof(InputParser);
    });
    
    it('should get sender', () => {
        expect(inputParser.getSender()).to.equal(sender);
    });
    
    it('should get pool config', () => {
        expect(inputParser.getPoolConfig()).to.equal(poolConfig);
    });

    describe('when try to get recipients', () => {

        beforeEach(() => {
            readFileStub.resolves(JSON.stringify(recipients));
        });

        it('should read file from correct file path', async () => {
            await inputParser.parse();

            await expect(fs.readFile).to.have.been.calledWith(recipientsFilePath);
        });

        it('should throw Error when content in file is not in json format', async () => {
            fs.readFile = sinon.stub().resolves('oh hello }');

            await expect(inputParser.parse()).to.have.been.rejectedWith(InvalidFileContentError, recipientsFilePath);
        });

        it('should parse file content if it is in json format', async () => {
            fs.readFile = sinon.stub().resolves(JSON.stringify(recipients));

            await inputParser.parse();

            expect(inputParser.getRecipients()).to.deep.equal(recipients);
        });

    });

    describe('when try to get an email content', () => {
        const emailMessageContent = 'hello sir!';

        beforeEach(() => {
            readFileStub.onCall(0).resolves(JSON.stringify(recipients));
            readFileStub.onCall(1).resolves(emailMessageContent);
        });

        it('should read file from correct file path', async () => {
            await inputParser.parse();

            await expect(fs.readFile).to.have.been.calledWith(emailMessagePath);
        });

        it('should throw error if something is wrong with reading a file content', async () => {
            readFileStub.onCall(1).rejects(new Error('Some FS problem'));

            await expect(inputParser.parse()).to.have.been.rejectedWith(InvalidFileContentError, emailMessagePath);
        });

        it('should parse file content', async () => {
            await inputParser.parse();

            expect(inputParser.getMessage()).to.deep.equal(emailMessageContent);
        });

    });


});
