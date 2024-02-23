const { expect } = require('chai');
const JobRepository = require('../../src/repository/JobRepository');
const jobRepository = new JobRepository();

describe('JobRepository', () => {
    let jobId;
    const job = {
        title: 'Software Engineer',
        description: 'Develop software',
        location: 'Remote',
        notes: 'Must have 5 years of experience',
        companyId: 2
    };

    it('should save a job', async () => {
        const savedJob = await jobRepository.save(job);

        jobId = savedJob.id;

        expect(savedJob).to.have.property('title').deep.equal('Software Engineer');
        expect(savedJob).to.have.property('description').deep.equal('Develop software');
        expect(savedJob).to.have.property('location').deep.equal('Remote');
        expect(savedJob).to.have.property('notes').deep.equal('Must have 5 years of experience');
        expect(savedJob).to.have.property('companyId').deep.equal(2);
    });

    it('should get a job', async () => {
        const job = await jobRepository.get(jobId);

        expect(job).to.have.property('title').deep.equal('Software Engineer');
        expect(job).to.have.property('description').deep.equal('Develop software');
        expect(job).to.have.property('location').deep.equal('Remote');
        expect(job).to.have.property('notes').deep.equal('Must have 5 years of experience');
    });

    it('should list all jobs', async () => {
        const jobs = await jobRepository.list(null, null, null, null, null);

        expect(jobs.length).to.equal(1);
    });

    it('should publish a job', async () => {
        const job = await jobRepository.publish(jobId);

        const checkStatus = await jobRepository.get(jobId)

        expect(job[0]).to.equal(1);
        expect(checkStatus).to.have.property('status').to.equal('published')
    });

    it('should archive a job', async () => {
        const job = await jobRepository.archive(jobId);
        const checkStatus = await jobRepository.get(jobId);

        expect(job[0]).to.equal(1);
        expect(checkStatus).to.have.property('status').to.equal('archived')
    })

    it('should delete a job', async () => {
        const job = await jobRepository.delete(jobId);

        console.log(job)

        expect(job).to.equal(1);
    });
});