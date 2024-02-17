import {sequelize} from '../src/models/index.js'
import seedData from './dataSeeder.js'
async function syncDatabase(force) {
    try {
        if(force){
            await sequelize.sync({force: true})
        }else {
            await sequelize.sync({alter: true})
        }
        await seedData();
    } catch (error) {
        console.log('error'+error)
    }
}

export default syncDatabase