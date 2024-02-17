import CompanyController from "../src/controllers/CompanyController.js";

const companyController = new CompanyController();

async function seedData(){
    try {
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