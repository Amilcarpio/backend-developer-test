import axios from 'axios'
import { expect, assert, should } from 'chai'

describe('GET /companies', () => {
    it('Deve retornar uma lista com as empresas', async () => {
        const res = await axios.get('http://localhost:3000/api/companies')
        expect(res.status).to.equal(200)
    })
})

describe('GET /companies/:company_id', () => {
    it('Deve retornar uma empresa pelo seu id', async () => {
        const res = await axios.get('http://localhost:3000/api/companies/1')
        expect(res.status).to.equal(200)
    })
})