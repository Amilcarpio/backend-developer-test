const axios = require('axios');
const { expect } = require('chai');

describe.skip('Feed', () => {
    it('should return a list of posts', async () => {
        const response = await axios.get('http://localhost:3000/api/feed');
        console.log(response.data)
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('array');
    });
});