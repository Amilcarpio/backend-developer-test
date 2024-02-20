// import JobRepository from "./../repository/JobRepository.js"
// import CompanyRepository from "./../repository/CompanyRepository.js"

// // const jobRepository = new JobRepository()
// const companyRepository = new CompanyRepository()

class JobController {
  constructor (jobRepository, companyRepository) {
    this.jobRepository = jobRepository
    this.companyRepository = companyRepository
  }

  async save (req, res) {
    try {
      const jobDAO = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        notes: req.body.notes,
        companyId: req.body.companyId
      }

      console.log('=============Recebido: ' + JSON.stringify(jobDAO))

      if (!jobDAO.companyId || typeof jobDAO.companyId !== 'number') {
        res
          .status(400)
          .json({ status: 'error', message: 'CompanyId is invalid' })
        console.log('CompanyId is invalid')
        return
      }

      const searchDAOCompany = await this.companyRepository.get(
        jobDAO.companyId
      )

      if (!searchDAOCompany) {
        res
          .status(400)
          .json({ status: 'error', message: 'CompanyId not found' })
        console.log('CompanyId not found')
        return
      }

      if (!jobDAO.title || typeof jobDAO.title !== 'string') {
        res.status(400).json({ status: 'error', message: 'Title is invalid' })
        console.log('Title is invalid')
        return
      }

      if (!jobDAO.description || typeof jobDAO.description !== 'string') {
        res
          .status(400)
          .json({ status: 'error', message: 'Description is invalid' })
        console.log('Description is invalid')
        return
      }

      if (!jobDAO.location || typeof jobDAO.location !== 'string') {
        res
          .status(400)
          .json({ status: 'error', message: 'Location is invalid' })
        console.log('Location is invalid')
        return
      }

      const result = await this.jobRepository.save(jobDAO)
      res.status(201).json(result)
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message })
      console.log('Error at POST/job: ' + error)
    }
  }

  async update (req, res) {
    try {
      const jobId = req.params.job_id
      console.log('jobId: ' + jobId)

      const searcJob = await this.jobRepository.get(jobId)
      if (!searcJob) {
        res.status(404).json({ status: 'error', message: 'Job not found' })
        console.log('Job not found')
        return
      }

      if (searcJob.status === 'published') {
        res
          .status(409)
          .json({ status: 'error', message: 'Job already published' })
        console.log('Job already published')
        return
      }

      const result = await this.jobRepository.update(jobId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
      console.log('error' + error)
    }
  }

  async publish (req, res) {
    try {
      const jobId = req.params.job_id
      console.log('Job id to be published: ' + jobId)
      await this.jobRepository.publish(jobId)
      res.status(200).json({ status: 'updated' })
    } catch (error) {
      res.status(500).json(error)
      console.log('error' + error)
    }
  }

  async archive (req, res) {
    try {
      const jobId = req.params.job_id
      console.log('Job id to be archived: ' + jobId)
      await this.jobRepository.archive(jobId)
      res.status(200).json({ status: 'archived' })
    } catch (error) {
      console.log('error' + error)
      res.status(500).json(error)
    }
  }

  async delete (req, res) {
    try {
      const jobId = req.params.job_id
      console.log('Job id to be deleted: ' + jobId)
      await this.jobRepository.delete(jobId)
      res.status(200).json({ status: 'deleted' })
    } catch (error) {
      console.log('error' + error)
      res.status(500).json(error)
    }
  }
}

export default JobController
