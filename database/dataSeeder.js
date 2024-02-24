const AWS = require('aws-sdk');
const CompanyController = require("../src/repository/CompanyRepository.js");
const jobsJson = require('./jobs-list.json');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const companyController = new CompanyController();

async function seedData() {
    try {
        console.log('#+#+#+#+#+#+#+# Creating fake data.')
        const companies = await companyController.list(null, null)

        if (companies.length > 0) {
            console.log('#+#+#+#+#+#+#+# Data already created.')
            return;
        }

        await Promise.all([
            companyController.save({
                name: 'ABC Corp'
            }),

            companyController.save({
                name: 'XYZ LLC'
            }),

            companyController.save({
                name: 'ACME Enterprises'
            })
        ])

        const fetchS3 = await s3.putObject({
            Bucket: 'jobs-feed-bucket',
            Key: 'jobs-list.json',
            Body: JSON.stringify(jobsJson)
        }).promise()

        console.log('======Data saved to S3: ' + JSON.stringify(fetchS3))

        console.log('#+#+#+#+#+#+#+# Fake data created.')
    } catch (error) {
        console.log("error" + error)
        throw error
    }
}

module.exports = seedData;
