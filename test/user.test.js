
var supertest = require('supertest');
const app = require('../src/routes/user.js');
const request = supertest('http://localhost:3000');

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
            "national_id": "11111111",
            "national_id_type": "DNI",
            "password": "cosmefulanito1123",
            "profile": 0
        }

        const res = await request.post('/profile-register').send(req);
        expect(res.alias).toBe('cosmefulanito');
        expect(res.email).toBe('cosmefulanito@gmail.com');
        expect(res.name).toBe('Cosme');
  
    });

    xit('User register fail', () => {
        
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
        expect(res.alias).toBe('cosmefulanito');
    });

    xit('User login success', () => {
        const req = {
            "email": "cosmefulanito@gmail.com",
            "password": "cosmefulanito1123",
        }

        const res = request(app).post('/profile-login').send(req);
    });

    xit('User login fail', () => {
        const req = {
            "email": "cosmefulanito@gmail.com"
        }

        const res = request(app).post('/profile-login').send(req);
    });
 
});
