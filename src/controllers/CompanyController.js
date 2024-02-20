class CompanyController {
    constructor (companyRepository) {
        this.companyRepository = companyRepository
    }

    async list(req,res){
        try {
            const companies = await this.companyRepository.list(null, null)
            res.status(200).json(companies)
        } catch (error) {
            res.status(500).json(error)
            console.log('error' + error)
        }
    }

    async get(req,res){
        try {
            const companyId = req.params.company_id
            console.log('=============Recebido: ' + companyId)
            const companies = await this.companyRepository.get(companyId)
            res.status(200).json(companies)
        } catch (error) {
            res.status(500).json({status: 'error', message: error.message})
            console.log('error' + error)
        }
    }
    
}

export default CompanyController