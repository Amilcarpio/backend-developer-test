import chai from 'chai';
const expect = chai.expect()

describe('API integration test', () => {
    it('Should test the API status', async () => {
        const response = await chai.request('http://localhost:3000').get('/')
        expect(response.status).to.equal(200)
    })
})