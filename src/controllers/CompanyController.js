const CompanyRepository = require('../repository/CompanyRepository.js')

const companyRepository = new CompanyRepository()
class CompanyController {
    constructor () {
    }

    async list(req,res){
        try {
            const companies = await companyRepository.list(null, null)
            if(!companies){
                console.log('=========Companies not found')
                return res
                    .status(400)
                    .json({status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.'})
            }
            res.status(200).json(companies)
        } catch (error) {
            res.status(500).json({status: 'error', message: error.message})
            console.log('Error at List/company: ' + error)
        }
    }

    async get(req,res){
        try {
            console.log('=============Recebido: ' + req.params.company_id)
            const companyId = req.params.company_id
            const company = await companyRepository.get(companyId)
            if(!company){
                console.log('=========Company not found')
                return res
                    .status(400)
                    .json({status: 'error', message: 'Sorry, the provided data is not valid. Please check and try again.'})
            }
            res.status(200).json(company)
        } catch (error) {
            res.status(500).json({status: 'error', message: error.message})
            console.log('Error at Get/company: ' + error)
        }
    }
    
}

module.exports = CompanyController
