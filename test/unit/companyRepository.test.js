const { expect }= require('chai');
const CompanyRepository = require('../../src/repository/CompanyRepository');
const companyRepository = new CompanyRepository();

describe('CompanyRepository', () => {
    it('should get a company', async () => {
        const company = await companyRepository.get(1);

        expect(company).to.have.property('name').deep.equal('ABC Corp');
    });

    it('should list all companies', async () => {
        const companies = await companyRepository.list(null, null);

        expect(companies.length).to.equal(3)
    });

    it('Should get a company by id', async () => {
        const company = await companyRepository.get(1);

        expect(company).to.have.property('name').deep.equal('ABC Corp');
    });

})
