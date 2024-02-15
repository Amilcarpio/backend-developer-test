import model from '../models/job.js'
import sequelize from 'sequelize'
const { Op } = sequelize.Op

class Jobs {
    async save(DAO) {
      try {
        const item = await model.sequelize.models.Jobs.create({
          title: DAO.title,
          description: DAO.description,
          location: DAO.location,
          notes: DAO.notes,
          status: DAO.status
        })

        return item
      } catch (error) {
        console.log('error' + error)
        throw new Error(error)
      }
    }

  async get (id) {
    try {
      let where = {}
      where.jobId = id

      const data = await model.sequelize.models.Jobs.findOne({
        attributes: ['title', 'description', 'location', 'notes', 'status'],
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

  async list (title, status, location, companyId) {
    try {
      let where = {}

      if (title) {
        where.title = {
          [Op.like]: `%${title}%`
        }
      }

      if (status) {
        where.status = status
      }

      if (location) {
        where.location = {
          [Op.like]: `%${location}%`
        }
      }

      if (companyId) {
        where.companyId = companyId
      }

      const fields = ['title', 'description', 'location', 'notes', 'status']

      const data = await model.sequelize.models.Jobs.findAll({
        attributes: fields,
        include: [
          { model: model.Company, as: 'company', attributes: ['id','name', 'createdAt'] }
        ],
        where: where,
        limit: 10,
        offset: 0
      }) 

      return JSON.stringify(data)
    } catch (error) {
        console.log('error' + error)
        throw new Error(error)
    }
  }

  async update(id, data) {
    try {
      let where = {}
      where.jobId = id
      const result = await model.sequelize.models.Jobs.update(data, {
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
      let where = {}
      where.jobId = id
      const result = await model.sequelize.models.Jobs.destroy({
        where: where
      })
      return result
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }
}

export default Jobs
