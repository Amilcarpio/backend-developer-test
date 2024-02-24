const AWS = require('aws-sdk');
const JobRepository = require('./src/repository/JobRepository');

const jobRepository = new JobRepository();
const s3 = new AWS.S3();

module.exports.handler = async (event) => {
    const jobsList = await jobRepository.list(null, null, null, 'published', null, null, null);
    
    let jobsDAO = []
    if(jobsList.length === 0) {
        console.log('=========No jobs founded')
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'No jobs found' })
        };
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
        Body: JSON.stringify(jobsList),
        ContentType: 'application/json'
    };

    try {
        await s3.putObject(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(jobsList)
        };
    } catch (error) {
        console.log('Error at sendJobListToS3: ' + error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};