const express = require('express');
const JobController = require('../src/controllers/JobController.js');
const CompanyController = require('../src/controllers/CompanyController.js');
const jobController = new JobController();
const companyController = new CompanyController();

const router = express.Router();

router.post('/job', jobController.save);

router.put('/job/:job_id/publish', jobController.publish)

router.put('/job/:job_id', jobController.update)

router.put('/job/:job_id/archive', jobController.archive)

router.delete('/job/:job_id', jobController.delete)

router.get('/companies', companyController.list)

router.get('/companies/:company_id', companyController.get)

router.get('/feed', jobController.feed)

module.exports = router;
