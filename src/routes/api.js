import express from 'express';
import { sequelize } from '../models/index.js';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
    console.log('hi there');
});

async function syncDatabase() {
    try {
        await sequelize.sync()
    } catch (error) {
        console.log('error'+error)
    }
}

router.post('/job', async (req, res) => {
    try {
        const jobDAO = {
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            notes: req.body.notes,
            status: req.body.status
        }
        const result = await sequelize.models.Jobs.save(jobDAO)
        res.status(201).send(result)
    } catch (error) {
        res.status(500).send(error)
        console.log('error' + error)
    }
})
syncDatabase()

export default router