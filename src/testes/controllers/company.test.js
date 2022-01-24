import request from 'supertest';
import app from "../../app";

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

describe('Comany Request Tests', () => {
    test('Create New Company', async () => {

        const response = await request(app).post('/companies/register').send(conpanyDataTest).expect(201);

        expect(response.body.company).toHaveProperty('id');
        expect(response.body.company.cnpj).toBe('00011133366699');
        expect(response.body.company.name).toBe('The Test Company');

    });
});

