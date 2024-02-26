const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const JobRepository = require('../../src/repository/JobRepository');
const moderationHandler = require('../../handlers/moderationGPT').handler;

const expect = chai.expect;

describe('ModerationHandler', function() {
  let axiosPostStub, jobRepositoryUpdateStub;

  beforeEach(function() {
    axiosPostStub = sinon.stub(axios, 'post');
    jobRepositoryUpdateStub = sinon.stub(JobRepository.prototype, 'update');
  });

  afterEach(function() {
    axiosPostStub.restore();
    jobRepositoryUpdateStub.restore();
  });

  it('should process approved offer', async function() {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            title: 'Test Title',
            description: 'Test Description',
            id: '1'
          })
        }
      ]
    };
    axiosPostStub.resolves({ data: { results: [{ flagged: false }] } });

    await moderationHandler(event);

    expect(jobRepositoryUpdateStub.calledWith('1', { status: 'published' })).to.be.true;
  });

  it('should reject offer', async function() {
    const event = {
      Records: [
        {
          body: JSON.stringify({
            title: 'Test Title',
            description: 'Test Description',
            id: '1'
          })
        }
      ]
    };

    axiosPostStub.resolves({ data: { results: [{ flagged: true, result: ['note1'] }] } });

    await moderationHandler(event);

    expect(jobRepositoryUpdateStub.calledWith('1', { status: 'rejected', notes: 'note1' })).to.be.true;
  });
});