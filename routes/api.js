import express from 'express';
import JobController from '../src/controllers/JobsController.js';
import CompanyController from '../src/controllers/CompanyController.js';
import syncDatabase from '../database/syncDatabase.js';

const jobController = new JobController();
const companyController = new CompanyController();

const router = express.Router();

router.post('/job', async (req, res) => {
    try {   
        const jobDAO = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            notes: req.body.notes,
            companyId: req.body.companyId
        }

        console.log('=============Recebido: ' + JSON.stringify(jobDAO))

        const searchDAOCompany = await companyController.get(jobDAO.companyId)


        if(!jobDAO.companyId || typeof jobDAO.companyId !== 'number'){
            res.status(400).json({status: 'error', message: 'CompanyId is invalid'})
            console.log('CompanyId is invalid')
            return;
        }

        if(!searchDAOCompany){
            res.status(404).json({status: 'error', message: 'CompanyId not found'})
            console.log('CompanyId not found')
            return;
        }

        if(!jobDAO.title || typeof jobDAO.title !== 'string'){
            res.status(400).json({status: 'error', message: 'Title is invalid'})
            console.log('Title is invalid')
            return;
        }

        if(!jobDAO.description || typeof jobDAO.description !== 'string'){
            res.status(400).json({status: 'error', message: 'Description is invalid'})
            console.log('Description is invalid')
            return;
        }

        if(!jobDAO.location || typeof jobDAO.location !== 'string'){
            res.status(400).json({status: 'error', message: 'Location is invalid'})
            console.log('Location is invalid')
            return;
        }

        const result = await jobController.save(jobDAO)
        res.status(201).json({status: 'created', result: result})
    } catch (error) {
        res.status(500).json({status: 'error', message: error.message})
        console.log('Error at POST/job: ' + error)
    }
})

router.put('/job/:job_id/publish', async (req, res) => {
    try {
        const jobId = req.params.job_id
        console.log('jobId: ' + jobId)
        const searcJob = await jobController.get(jobId)
        if(searcJob.status === 'published'){
            res.status(409).json({status: 'error', message: 'Job already published'})
            console.log('Job already published')
            return;
        }

        if(!searcJob){
            res.status(404).json({status: 'error', message: 'Job not found'})
            console.log('Job not found')
            return;
        }


        const result = await jobController.publish(jobId)
        res.status(200).json({status: 'published', result: result})
    } catch (error) {
        res.status(500).json(error)
        console.log('error' + error)
    }
})

router.put('/job/:job_id', async (req, res) => {
    try {
        const DAO = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
        }
        const jobId = req.params.job_id
        const result = await jobController.publish(jobId, DAO)
        res.status(200).json({status: 'updated', result: result})
    } catch (error) {
        res.status(500).json(error)
        console.log('error' + error)
    }
})

router.put('/job/:job_id/archive', async (req, res) => {
    try {
        const jobId = req.params.job_id
        const result = await jobController.archive(jobId)
        res.status(200).json({status: 'archived', result: result})
    } catch (error) {
        console.log('error' + error)
        res.status(500).json(error)
    }
})

router.delete('/job/:job_id', async (req, res) => {
    try {
        const jobId = req.params.job_id
        const result = await jobController.delete(jobId)
        res.status(200).json({status: 'deleted', result: result})
    } catch (error) {
        console.log('error' + error)
        res.status(500).json(error)
    }
})

router.get('/companies', async (req,res) => {
    try {
        const companies = await companyController.list(null, null)
        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json(error)
        console.log('error' + error)
    }
})

router.get('/companies/:company_id', async (req,res) => {
    try {
        const companyId = req.params.company_id
        const companies = await companyController.get(companyId)
        res.status(200).json(companies)
    } catch (error) {
        res.status(500).json(error)
        console.log('error' + error)
    }
})

router.get('/feed', async (req,res) => {
    try {
        
    } catch (error) {
        
    }
})


syncDatabase()

export default router