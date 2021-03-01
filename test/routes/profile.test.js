
var supertest = require('supertest-as-promised');
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var apiClient = require("../../src/communication/client/ApiClient.js")
const request = supertest(server);



describe(" Test Suite: profile", () => {


    beforeEach(() => {
        jest.resetAllMocks();
        const validTokenMock = jest.spyOn(validToken, "validToken");
        validTokenMock.mockReturnValue(true);
        dbMock.mockResolvedValueOnce({});

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

    it('Create Profile fail ', async () => {
        try {

            const apiClientMock = jest.spyOn(apiClient.prototype, "addProfile");
            apiClientMock.mockReturnValue({
              status: 400,
              error: true
            });

            const res = await request.post('/profile').send({
                "description": "un perfil"
              });
            expect(res.body.status).toBe(400);
            expect(res.body.error).toBe(true);
        } catch (error) {
            console.log(error.message)
        }
    })

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
