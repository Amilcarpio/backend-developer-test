const express = require('express');
const JobController = require('../src/controllers/JobController.js');
const CompanyController = require('../src/controllers/CompanyController.js');
const jobController = new JobController();
const companyController = new CompanyController();

const router = express.Router();
/**
 * @swagger
 * /api/job:
 *   post:
 *     description: Save a new job.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               notes:
 *                 type: string
 *               companyId:
 *                 type: integer
 *             required:
 *               - title
 *               - description
 *               - location
 *               - companyId
 *             example:
 *               title: "Software Engineer"
 *               description: "Develop new features"
 *               location: "Remote"
 *               notes: "We are looking for a professional with experience in developing new features."
 *               companyId: 1
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/job', jobController.save);

/**
 * @swagger
 * /api/job/{job_id}/publish:
 *   put:
 *     description: Publish a new job by jobId.
 *     parameters:
 *       - in: path
 *         name: job_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the job to publish.
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/job/:job_id/publish', jobController.publish)

/**
 * @swagger
 * /api/job/{job_id}:
 *   put:
 *     description: Update a job by jobId.
 *     parameters:
 *       - in: path
 *         name: job_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the job to update.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - location
 *             example:
 *               title: "Software Engineer"
 *               description: "Develop new features"
 *               location: "Remote"
 *     responses:
 *       200:
 *         description: Success.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/job/:job_id', jobController.update)

/**
 * @swagger
 * /api/job/{job_id}/archive:
 *   put:
 *     description: Archive a job by jobId.
 *     parameters:
 *       - in: path
 *         name: job_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the job to archive.
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.put('/job/:job_id/archive', jobController.archive)

/**
 * @swagger
 * /api/job/{job_id}:
 *   delete:
 *     description: Delete a job by jobId.
 *     responses:
 *       200:
 *         description: Sucess
 *       400:
 *         description: Bad Request
 *       500:
 *        description: Internal Server Error
 */
router.delete('/job/:job_id', jobController.delete)

/**
 * @swagger
 * /api/job/{job_id}:
 *   delete:
 *     description: Delete a job by jobId.
 *     parameters:
 *       - in: path
 *         name: job_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the job to delete.
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/companies', companyController.list)

/**
 * @swagger
 * /api/companies/{company_id}:
 *   get:
 *     description: Return a company by companyId.
 *     parameters:
 *       - in: path
 *         name: company_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the company to get.
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/companies/:company_id', companyController.get)

/**
 * @swagger
 * /api/feed:
 *   get:
 *     description: Return a feed of jobs.
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/feed', jobController.feed)

module.exports = router;
