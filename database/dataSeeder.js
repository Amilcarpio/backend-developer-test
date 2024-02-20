import CompanyController from "../src/repository/CompanyRepository.js";

const companyController = new CompanyController();

async function seedData(){
    try {
        console.log('#+#+#+#+#+#+#+# Criando dados iniciais.')
        const companies = await companyController.list(null, null)

        if(companies.length > 0){
            console.log('#+#+#+#+#+#+#+# Dados já criados.')
            return;
        }

        await Promise.all([
            companyController.save({
                name: 'ABC Corp'
            }),

            companyController.save({
                name: 'XYZ LLC'
            }),

            companyController.save({
                name: 'ACME Enterprises'
            })
        ])

    } catch (error) {
        console.log("error" + error)
        throw error
    }
}

export default seedData