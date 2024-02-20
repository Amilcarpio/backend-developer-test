import axios from 'axios'
import { expect, assert, should } from 'chai'

describe('Companies API integration test', () => {
    it('Should list all companies', async () => {
        const res = await axios.get('http://localhost:3000/api/companies')

        expect(res.status).to.equal(200)
        expect(res.data.length).to.equal(3)
        expect(res.data[0]).to.have.property('name').deep.equal('ABC Corp')
        expect(res.data[1]).to.have.property('name').deep.equal('XYZ LLC')
        expect(res.data[2]).to.have.property('name').deep.equal('ACME Enterprises')
    })

    it('Should get a company', async () => {
        const res = await axios.get('http://localhost:3000/api/companies/1')

        expect(res.status).to.equal(200)
        expect(res.data).to.have.property('name').deep.equal('ABC Corp')
    })
})
