import axios from 'axios'
import { expect, assert, should } from 'chai'

describe('Jobs API integration test', () => {
  let res;
  const jobData = {
    title: 'Desenvolvedor Full Stack',
    description: 'Descrição do trabalho...',
    location: 'Localização do trabalho',
    notes: 'Notas adicionais...',
    companyId: 1
  }

  it('Should create a new job', async () => {
    res = await axios.post('http://localhost:3000/api/job', jobData)

    expect(res.status).to.equal(201)
    expect(res.data).to.have.property('status').deep.equal('draft')
    expect(res.data).to.have.property('title').deep.equal(jobData.title)
    expect(res.data).to.have.property('description').deep.equal(jobData.description)
    expect(res.data).to.have.property('location').deep.equal(jobData.location)
    expect(res.data).to.have.property('notes').deep.equal(jobData.notes)
    expect(res.data).to.have.property('companyId').deep.equal(jobData.companyId)
    expect(res.data).to.have.property('updatedAt')
    expect(res.data).to.have.property('createdAt')
  })

  it('Should update a job', async () => {
    jobData.title = 'Desenvolvedor Full Stack - Atualizado'
    jobData.description = 'Descrição do trabalho - Atualizada'
    jobData.location = 'Localização do trabalho - Atualizada'
    const result = await axios.put(`http://localhost:3000/api/job/${res.data.id}`, jobData)

    expect(result.status).to.equal(200)
    expect(result.data[0]).to.equal(1)
    expect(result.data[1][0]).to.have.property('title').deep.equal(jobData.title)
    expect(result.data[1][0]).to.have.property('description').deep.equal(jobData.description)
    expect(result.data[1][0]).to.have.property('location').deep.equal(jobData.location)
  })

  it('Should publish a job', async () => {
    const result = await axios.put(`http://localhost:3000/api/job/${res.data.id}/publish`)

    expect(result.status).to.equal(200)
    expect(result.data[1][0]).to.have.property('status').deep.equal('published')
  })

  it('Should archive a job', async () => {
    const result = await axios.put(`http://localhost:3000/api/job/${res.data.id}/archive`)

    expect(result.status).to.equal(200)
    expect(result.data[1][0]).to.have.property('status').deep.equal('archived')
  })

  it('Should delete a job', async () => {
    const result = await axios.delete(`http://localhost:3000/api/job/${res.data.id}`)

    expect(result.status).to.equal(200)
    expect(result.data).to.equal(1)
  })
})
