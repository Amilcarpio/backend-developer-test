const CompanyController = require("../src/repository/CompanyRepository.js");

const companyController = new CompanyController();

async function seedData(){
    try {
        console.log('#+#+#+#+#+#+#+# Creating fake data.')
        const companies = await companyController.list(null, null)

        if(companies.length > 0){
            console.log('#+#+#+#+#+#+#+# Data already created.')
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
        console.log('#+#+#+#+#+#+#+# Fake data created.')
    } catch (error) {
        console.log("error" + error)
        throw error
    }
}

module.exports = seedData;
