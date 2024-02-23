const axios = require('axios');
const { expect } = require('chai');

describe('Feed', function() {
    it('should return a list of posts', async () => {
        const response = await axios.get('http://localhost:3000/api/feed');

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('title').to.equal('Dev backend')
        expect(response.data).to.have.property('description').to.equal('Develop the backend for the new app')
        expect(response.data).to.have.property('companyName').to.equal('Google')
        expect(response.data).to.have.property('createdAt').to.equal('2021-01-01T00:00:00')
    }).timeout(5000)
});