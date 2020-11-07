
const request = require('supertest');
const app = require('../src/routes/user.js');

beforeEach(() => {

});

afterEach(() => {

});

describe(" Test Suite: [src/routes/user.js] ", () => {
    
    it('User register success', async () => {

        const req = {
            "alias": "cosmefulanito",
            "email": "cosmefulanito@gmail.com",
            "first_name": "Cosme",
            "last_name": "Fulanito",
            "national_id": "DNI",
            "national_id_type": "11111111",
            "password": "cosmefulanito1123",
            "profile": 0
        }

        const res = request(app).post('/profile-register').send(req);

        // expect(res.code).toBe(200);
        // expect(res.email).toBe('cosmefulanito@gmail.com');
        // expect(res.alias).toBe('cosmefulanito');
        // expect(res.name).toBe('Cosme');
        // expect(res.toHaveProperty('id'));

    });

    it('User register fail', () => {
        const req = {
            "alias": "cosmefulanito",
            "email": "cosmefulanito@gmail.com",
            "first_name": "Cosme",
            "last_name": "Fulanito",
            "national_id": "DNI",
            "national_id_type": "11111111",
            "password": "cosmefulanito1123",
            "profile": 0
        }

        const res = request(app).post('/profile-register').send(req);
    });

    it('User login success', () => {
        const req = {
            "email": "cosmefulanito@gmail.com",
            "password": "cosmefulanito1123",
        }

        const res = request(app).post('/profile-login').send(req);
    });

    it('User login fail', () => {
        const req = {
            "email": "cosmefulanito@gmail.com",
            "password": "cosmefulanito1123",
        }

        const res = request(app).post('/profile-login').send(req);
    });
 
});
