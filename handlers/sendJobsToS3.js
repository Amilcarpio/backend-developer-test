const AWS = require('aws-sdk');
const JobRepository = require('../src/repository/JobRepository');
const jobRepository = new JobRepository();

module.exports.handler = async (event) => {
    console.log('=========sendJobListToS3 Received event:', JSON.stringify(event, null, 2));
    const s3 = new AWS.S3();
    const jobsList = await jobRepository.list(null, null, null, 'published', null, null, null);
    
    let jobsDAO = []
    if(jobsList.length === 0) {
        console.log('=========No jobs founded')
        return;
    }

    for (let i = 0; i < jobsList.length; i++) {
        jobsDAO.push({
            id: jobsList[i].dataValues.id,
            title: jobsList[i].dataValues.title,
            description: jobsList[i].dataValues.description,
            companyName: jobsList[i].dataValues.company.name,
            createdAt: jobsList[i].dataValues.createdAt
        });
    }

    const params = {
        Bucket: 'jobs-feed-bucket',
        Key: 'jobs-list.json',
        Body: JSON.stringify(jobsDAO),
        ContentType: 'application/json'
    };

    try {
        await s3.putObject(params).promise();
    } catch (error) {
        console.log('Error at sendJobListToS3: ' + error);
    }
};