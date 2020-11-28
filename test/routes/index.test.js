
var supertest = require('supertest-as-promised'); 
const server = require('../../src/routes/index.js');
const request = supertest(server);

describe(" Test Suite: index", () => {

    it('Status profile', async () => {
    
        const res = request.get('/status-profile');
        //expect(res.status).toBe(200);
    });

    it('Health profile', async () => {

        const res = request.get('/health');
        //expect(res.status).toBe(200);    
    });

    it('Welcome', async () => {

        const res = request.get('/');
        //expect(res.status).toBe(200);    
    });
});
