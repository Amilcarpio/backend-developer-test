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

syncDatabase()

export default router