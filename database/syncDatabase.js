import {sequelize} from '../src/models/sequelizeConfig.js'
import seedData from './dataSeeder.js'
async function syncDatabase(force) {
    try {
        console.log('===========syncDatabase      #Iniciando')
        if(force){
            await sequelize.sync({force: true})
        }else {
            await sequelize.sync({alter: true})
        }
        await seedData();
        console.log('===========syncDatabase      #Dados sincronizados')
    } catch (error) {
        console.log('error'+error)
    }
}

export default syncDatabase