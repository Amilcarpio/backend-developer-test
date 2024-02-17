import axios from 'axios'
import { expect, assert, should } from 'chai'

describe('POST /job', () => {
  it('Deve criar um novo job', async () => {
    const jobData = {
      title: 'Desenvolvedor Full Stack',
      description: 'Descrição do trabalho...',
      location: 'Localização do trabalho',
      notes: 'Notas adicionais...',
      status: 'published',
      companyId: 1
    }

    const res = await axios.post('http://localhost:3000/api/job', jobData)

    expect(res.status).to.equal(201)
    expect(res.data).to.have.property('companyId').deep.equal(jobData.companyId)
    expect(res.data).to.have.property('title').deep.equal(jobData.title)
  })
})

describe('PUT /job/:job_id/publish', () => {
  it('Deve publicar o job', async () => {
    const res = await axios.put('http://localhost:3000/api/job/1/publish')

    expect(res.status).to.equal(200)
    expect(res.data).to.have.property('status').deep.equal('published')
  })
})

describe('PUT /job/:job_id', () => {
    it('Deve editar o job', async () => {
      const jobData = {
        title: 'Desenvolvedor Full Stack',
        description: 'Nova descrição',
        location: 'Brasil',
      }
      const res = await axios.put('http://localhost:3000/api/job/1', jobData)
  
      expect(res.status).to.equal(200)
      expect(res.data).to.have.property('status').deep.equal('updated')
    })
  })

describe('PUT /job/:job_id/archive', () => {
  it('Deve arquivar o job', async () => {
    const res = await axios.put('http://localhost:3000/api/job/1/archive')

    expect(res.status).to.equal(200)
    expect(res.data).to.have.property('status').deep.equal('archived')
  })
})

describe('DELETE /job/:job_id', () => {
  it('Deve deletar o job', async () => {
    const res = await axios.delete('http://localhost:3000/api/job/1')

    expect(res.status).to.equal(200)
    expect(res.data).to.have.property('status').deep.equal('deleted')
  })
})