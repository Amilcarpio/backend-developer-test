import { Company } from '../models/sequelizeConfig.js'
import { Job } from '../models/sequelizeConfig.js'
class CompanyRepository {
    async save(DAO) {
      try {
        console.log('===========CompanyController      #save')
        const item = await Company.create({
            name: DAO.name
        })

        return item
      } catch (error) {
        console.log('error' + error)
        throw new Error(error)
      }
    }

  async get (id) {
    try {
    console.log('===========CompanyController      #get')
    console.log('========id: ', id)
      let where = {}
      where.id = id

      const data = await Company.findAll({
        attributes: ['id', 'name'],
        where: where,
        limit: 1,
        offset: 0
      })

      return data[0]
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }

  async list (companyId, jobId) {
    try {
    console.log('===========CompanyController      #list')
      let where = {}

      if (companyId) {
        where.id = id
      }

      if(jobId){
        where.jobId = jobId
      }

      const fields = ['id', 'name']

      const data = await Company.findAll({
        attributes: fields,
        include: [
          { model: Job, as: 'jobs', attributes: ['id','title', 'description', 'location', 'notes', 'status'] }
        ],
        where: where,
        limit: 10,
        offset: 0
      }) 

      return data
    } catch (error) {
        console.log('error' + error)
        throw new Error(error)
    }
  }

  async update(id, data) {
    try {
    console.log('===========CompanyController      #update:'+id)
      let where = {}
      where.id = id
      const result = await Company.update(data, {
        where: where
      })
      return result
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }

  async delete(id) {
    try {
    console.log('===========CompanyController      #delete:'+id)
      let where = {}
      where.id = id
      const result = await Company.destroy({
        where: where
      })
      return result
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }
}

export default CompanyRepository
