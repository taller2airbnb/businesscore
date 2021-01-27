
var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
const request = supertest(server);

describe(" Test Suite: wallet", () => {


    xit('User register bad request', async () => {

        
        jest.createMockFromModule(validToken);
        validToken.validToken = true;
        jest.createMockFromModule(decodeToken);
        tokenDecode.payload.id = 1;

        const res = await request.get('/wallet').send();
        expect(res.status).toBe(200);
    });

    xit('User register duplicate', async () => {

        const req = {
            "alias": "cosmefulanito",
            "email": "cosmefulanito@gmail.com",
            "first_name": "Cosme",
            "last_name": "Fulanito",
            "national_id": "11111111",
            "national_id_type": "DNI",
            "password": "cosmefulanito1123",
            "profile": 0
        }

        const res = await request.post('/profile-register').send(req);
        expect(res.status).toBe(200);
    });

    xit('User login success', async () => {

        const req = {
            "email": "cosmefulanito@gmail.com",
            "password": "cosmefulanito1123",
        }

        const res = await request.post('/profile-login').send(req);
        expect(res.status).toBe(200);
    });

    xit('User login fail', async () => {

        const req = {
            "email": "cosmefulanito@gmail.com",
            "password": "111",
        }

        const res = await request.post('/profile-login').send(req);
        expect(res.status).toBe(200);
    });
  
});
