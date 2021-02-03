
var supertest = require('supertest-as-promised');
const server = require('../../app.js');
const axios = require('axios');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js")


const request = supertest(server);


describe(" Test Suite: profile", () => {


    beforeEach(() => {
        jest.resetAllMocks();
        const validTokenMock = jest.spyOn(validToken, "validToken");
        validTokenMock.mockReturnValue(true);
    });

    it('Create Profile', async () => {
        try {

            const apiClientMock = jest.spyOn(apiClient.prototype, "addProfile");
            apiClientMock.mockReturnValue({
              status: 200,
              message: { "description": "un perfil", "id": 1 },
              error: false
            });

            const res = await request.post('/profile').send({
                "description": "un perfil"
              });
            expect(res.body.status).toBe(200);
            expect(res.body.error).toBe(false);
        } catch (error) {
            console.log(error.message)
        }
    });

    it('Get Profile', async () => {
        try {

            const apiClientMock = jest.spyOn(apiClient.prototype, "getProfile");
            apiClientMock.mockReturnValue({
              status: 200,
              message: { "description": "un perfil", "id": 1 },
              error: false
            });

            const res = await request.get('/profile').send({
                "description": "un perfil"
              });
            expect(res.body.status).toBe(200);
            expect(res.body.error).toBe(false);
        } catch (error) {
            console.log(error.message)
        }
    });

});
