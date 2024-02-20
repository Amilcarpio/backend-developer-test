import CompanyRepository from '../repository/CompanyRepository.js'

const companyRepository = new CompanyRepository()
class CompanyController {
    constructor () {
    }

    async list(req,res){
        try {
            const companies = await companyRepository.list(null, null)
            res.status(200).json(companies)
        } catch (error) {
            res.status(500).json(error)
            console.log('error' + error)
        }
    }

    async get(req,res){
        try {
            console.log('=============Recebido: ' + req.params.company_id)
            const companyId = req.params.company_id
            const companies = await companyRepository.get(companyId)
            res.status(200).json(companies)
        } catch (error) {
            res.status(500).json({status: 'error', message: error.message})
            console.log('error' + error)
        }
    }
    
}

export default CompanyController