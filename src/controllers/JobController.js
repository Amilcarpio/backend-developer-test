import JobRepository from "./../repository/JobRepository.js"
import CompanyRepository from "./../repository/CompanyRepository.js"

const jobRepository = new JobRepository()
const companyRepository = new CompanyRepository()

class JobController {
  constructor () {}

  async save (req, res) {
    try {
      const jobDAO = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        notes: req.body.notes,
        companyId: req.body.companyId
      }
      console.log('=============Received: ' + JSON.stringify(jobDAO))

      if (!jobDAO.companyId || typeof jobDAO.companyId !== 'number') {
        console.log('===========CompanyId is invalid')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      const searchDAOCompany = await companyRepository.get(jobDAO.companyId)
      console.log('==========Current Company: ' + searchDAOCompany.id)

      if (!searchDAOCompany) {
        console.log('=============CompanyId not found')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      if (!jobDAO.title || typeof jobDAO.title !== 'string') {
        console.log('================Title is invalid')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      if (!jobDAO.description || typeof jobDAO.description !== 'string') {
        console.log('Description is invalid')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      if (!jobDAO.location || typeof jobDAO.location !== 'string') {
        console.log('Location is invalid')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      const result = await jobRepository.save(jobDAO)
      console.log('=======Sended: ' + result)

      res.status(201).send(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
      console.log('Error at POST/job: ' + error)
    }
  }

async update (req, res) {
  try {
    console.log('==========Job id to be updated: ' + req.params.job_id)
    const jobDAO = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
    }

    const jobId = req.params.job_id

    const searchJob = await jobRepository.get(jobId)

    if (!searchJob) {
      console.log('==========JobId not found')
      return res
        .status(400)
        .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
    }

    if(searchJob.status === 'rejected'){
      console.log('==========JobId is rejected')
      return res
        .status(400)
        .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
    }

    if (searchJob.status !== 'draft') {
      console.log('==========JobId is not draft')
      return res
        .status(400)
        .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
    }
    
    if(!jobDAO.title || typeof jobDAO.title !== 'string'){
      console.log('==========Title is invalid')
      return res
        .status(400)
        .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
    }

    if(!jobDAO.description || typeof jobDAO.description !== 'string'){
      console.log('==========Description is invalid')
      return res
        .status(400)
        .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
    }

    if(!jobDAO.location || typeof jobDAO.location !== 'string'){
      console.log('==========Location is invalid')
      return res
        .status(400)
        .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
    }

    const result = await jobRepository.update(jobDAO, jobId)
    console.log('=======Sended: ' + result[1])

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message })
  }
}

  async publish (req, res) {
    try {
      console.log('==========Job id to be published: ' + req.params.job_id)
      const jobId = req.params.job_id

      const searchJob = await jobRepository.get(jobId)

      if(!searchJob){
        console.log('Job not found.')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
        
      }

      if(searchJob.status === 'published'){
        console.log('========Job already published')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
        
      }

      if(searchJob.status === 'rejected'){
        console.log('=========Job rejected.')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }
      
      const result = await jobRepository.publish(jobId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
      console.log('Error at PUT/job/published: ' + error)
    }
  }

  async archive (req, res) {
    try {
      console.log('==========Job id to be archived: ' + req.params.job_id)
      const jobId = req.params.job_id

      const searchJob = await jobRepository.get(jobId)

      if(!searchJob){
        console.log('========Job not found.')
       return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      if(searchJob.status === 'rejected'){
        console.log('==========JobId is rejected')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      if(searchJob.status === 'archived'){
        console.log('Job already archived')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' }) 
      }

      const result = await jobRepository.archive(jobId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({status: 'error', message: error.message})
      console.log('Error at PUT/job/archived: ' + error)
    }
  }

  async delete (req, res) {
    try {
      console.log('==========Job id to be deleted: ' + req.params.job_id)
      const jobId = req.params.job_id
      
      const searchJob = await jobRepository.get(jobId)

      if(!searchJob){
        console.log('Job not found')
        return res
          .status(400)
          .json({ status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.' })
      }

      const result = await jobRepository.delete(jobId)
      res.status(200).json(result)
    } catch (error) {
      console.log('error' + error)
      res.status(500).json(error)
    }
  }
}

export default JobController
