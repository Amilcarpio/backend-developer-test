const AWS = require('aws-sdk');
const axios = require('axios');
const JobRepository = require('../src/repository/JobRepository');
const jobRepository = new JobRepository();


const openaiApiKey = process.env.OPENAI_API_KEY;

module.exports.handler = async (event, context) => {
    console.log('====ModerationHandler Received event:', JSON.stringify(event, null, 2));
    for (const record of event.Records) {
        const messageBody = JSON.parse(record.body);
        console.log('Processing message...: ', messageBody);

        const moderationDecision = await analyzeText(messageBody.title, messageBody.description);
        console.log('Moderation decision: ', moderationDecision)

        if (moderationDecision.flagged) {
            await rejectOffer(messageBody, moderationDecision.response);
        } else {
            await processApprovedOffer(messageBody);
        }

    }
};

async function analyzeText(title, description) {
    console.log('OpenAI Analyzing text...');
    const response = await axios.post('https://api.openai.com/v1/moderations',
        { "input": title + ' ' + description },
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${openaiApiKey}`
            }
        }
    )
    console.log('OpenAI response: ', response.data.results[0])
    const flagged = response.data.results[0].flagged;

    return { flagged, response: response.data.results[0] };
}

async function processApprovedOffer(offer) {
    console.log('Offer approved, publishing...')
    offer.status = 'published';
    
    await jobRepository.update(offer.id, {
        status: 'published'
    });
}

async function rejectOffer(offer, response) {
    console.log('Offer rejected, adding notes...')
    offer.status = 'rejected';
    offer.notes = response.result[0];
    
    await jobRepository.update(offer.id, {
        status: 'rejected',
        notes: response.result[0]
    });

    console.log('Offer rejected: ', JSON.stringify(offer.notes, null, 2));
}