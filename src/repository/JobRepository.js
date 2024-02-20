import { Job } from '../models/sequelizeConfig.js'
import sequelize from 'sequelize'
const { Op } = sequelize.Op

class JobRepository {
  async save (DAO) {
    try {
      console.log('===========JobController      #save')
      const item = await Job.create({
        title: DAO.title,
        description: DAO.description,
        location: DAO.location,
        notes: DAO.notes,
        companyId: DAO.companyId
      })
      console.log('saved: ' + JSON.stringify(item))
      return item
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }

  async get(id) {
    try {
        console.log('===========JobController      #get');
        console.log('========id: ', id);
        let where = {};
        where.id = id;

        const data = await Job.findAll({
            attributes: ['title', 'description', 'location', 'notes', 'status'],
            where: where,
            limit: 1,
            offset: 0
        });


        return data[0]; 
    } catch (error) {
        console.log('error' + error);
        throw new Error(error);
    }
}

  async list (title, status, location, companyId, id) {
    try {
      console.log('===========JobController      #list')
      console.log('==========Params: ', title, status, location, companyId, id)
      let where = {}

      if (id) {
        where.id = id
      }

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

      const data = await Job.findAll({
        attributes: fields,
        include: [
          {
            model: model.Company,
            as: 'company',
            attributes: ['id', 'name', 'createdAt']
          }
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

  async update (data, id) {
    try {
      console.log('===========JobController      #update')
      console.log('===========id: ', id)
      let where = {}
      where.id = id
      const result = await Job.update(data, {
        returning: true, where: where, 
      })
      return result
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }

  async publish (id) {
    try {
      console.log('===========JobController      #publish')
      console.log('===========id: ', id)
      let where = {}
      where.id = id

      const data = {
        status: 'published'
      }
      const result = await Job.update(data, {
        returning: true, where: where
      })
      return result
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }

  async archive (id) {
    try {
      console.log('===========JobController      #archive')
      console.log('===========id: ', id)
      let where = {}
      where.id = id

      const data = {
        status: 'archived'
      }

      const result = await Job.update(data, {
        returning:true, where: where
      })

      return result
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }

  async delete (id) {
    try {
      console.log('===========JobController      #delete')
      console.log('===========id: ', id)
      let where = {}
      where.id = id
      const result = Job.destroy({
        returnin: true, where: where
      })
      return result
    } catch (error) {
      console.log('error' + error)
      throw new Error(error)
    }
  }
}

export default JobRepository
