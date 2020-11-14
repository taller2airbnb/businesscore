
var supertest = require('supertest');   
const app = require('../../src/routes/user.js');
const request = supertest('http://localhost:3000');

describe(" Test Suite Api: user calls", () => {

    it('User register success', async () => {

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

    it('User register duplicate', async () => {

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

    it('User register bad request', async () => {

        const req = {
            "alias": "cosmefulanito",
            "email": "cosmefulanito@gmail.com"
        }

        const res = await request.post('/profile-register').send(req);
        expect(res.status).toBe(201);
    });

    it('User login success', async ()  => {
        const req = {
            "email": "cosmefulanito@gmail.com",
            "password": "cosmefulanito1123"
        }

        const res = await request.post('/profile-login').send(req);
        expect(res.status).toBe(200);
    });

    it('User login bad request', async ()  => {
        const req = {
            "email": "cosmefulanito@gmail.com"
        }

        const res = await request.post('/profile-login').send(req);
        expect(res.status).toBe(201);
    });

    it('User login fail', async () => {
        const req = {
            "email": "cosmefulanito@gmail.com",
            "password": "1111"
        }

        const res = await request.post('/profile-login').send(req);
        expect(res.status).toBe(200);
    });
 
});
