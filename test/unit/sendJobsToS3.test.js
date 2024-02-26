const chai = require('chai');
const sinon = require('sinon');
const AWS = require('aws-sdk');
const JobRepository = require('../../src/repository/JobRepository');
const { handler } = require('../../handlers/sendJobsToS3');

const expect = chai.expect;

describe('sendJobListToS3', function() {
    let listStub, putObjectStub, s3Instance;

    beforeEach(function() {
        listStub = sinon.stub(JobRepository.prototype, 'list');
        s3Instance = new AWS.S3();
        putObjectStub = sinon.stub(s3Instance, 'putObject');

        sinon.stub(AWS, 'S3').returns(s3Instance);
    });

    afterEach(function() {
        listStub.restore();
        putObjectStub.restore();
        AWS.S3.restore();
    });

    it('should send jobs to S3', async function() {
        listStub.returns(Promise.resolve([
            {
                dataValues: {
                    id: '1',
                    title: 'Dev backend',
                    description: 'Develop the backend for the new app',
                    company: { name: 'Google' },
                    createdAt: '2021-01-01T00:00:00'
                }
            }
        ]));

        putObjectStub.returns({
            promise: () => Promise.resolve()
        });

        await handler()

        sinon.assert.calledWith(putObjectStub, sinon.match({
            Bucket: 'jobs-feed-bucket',
            Key: 'jobs-list.json',
            ContentType: 'application/json'
        }));

        const call = putObjectStub.getCall(0);
        const body = JSON.parse(call.args[0].Body);

        expect(body).to.deep.equal([
            {
                id: '1',
                title: 'Dev backend',
                description: 'Develop the backend for the new app',
                companyName: 'Google',
                createdAt: '2021-01-01T00:00:00'
            }
        ]);

    });
});