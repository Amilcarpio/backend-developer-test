const AWS = require('aws-sdk');

async function sendToSQS(jobDetails) {
    try {
        console.log('Sending job to SQS...');
        const sqs = new AWS.SQS();
       
        const params = {
            MessageBody: JSON.stringify(jobDetails),
            QueueUrl: 'https://sqs.sa-east-1.amazonaws.com/471112788617/moderation_queue'
        };
        console.log('Sending message to SQS: ' + JSON.stringify(params));
        const res = await sqs.sendMessage(params).promise();
        console.log('Message sent: ' + JSON.stringify(res));
    } catch (error) {
        console.log('Error sending message to SQS: ' + error.message);
        throw error;
    }
  }

module.exports = { sendToSQS };