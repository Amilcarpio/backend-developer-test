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
            status: req.body.status,
            companyId: req.body.companyId
        }
        const result = await jobController.save(jobDAO)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
        console.log('error' + error)
    }
})

router.put('/job/:job_id/publish', async (req, res) => {
    try {
        const jobId = req.params.job_id
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


syncDatabase()

export default router