import { companySchema } from '../../models/company.validation.model';

const conpanyDataTest = {
    "name": "The Test Company",
    "cnpj": "00011133366699",
    "password": "123",
    "cep": "123456",
    "address": "casa",
    "number": 557,
    "state": "RJ",
    "city": "RJ"
};

describe('Company Schema Validation', () => {
    test('Validade New Company data', async () => {

        const validatedCompany = await companySchema.validate(conpanyDataTest);
        expect(validatedCompany).toBeTruthy();
    });
});