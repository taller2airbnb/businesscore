
var supertest = require('supertest-as-promised');
const server = require('../../app.js');
const axios = require('axios');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js")


const request = supertest(server);


describe(" Test Suite: wallet", () => {


    beforeEach(() => {
        jest.resetAllMocks();
        const dbMock = jest.spyOn(dao, "inicialize");
        dbMock.mockResolvedValueOnce({});
    });

    it('User get wallet', async () => {
        try {

            jest.mock('axios');
            const validTokenMock = jest.spyOn(validToken, 'validToken');
            validTokenMock.mockReturnValue(true);

            const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
            tokenDecodeMock.mockReturnValue({ "payload": { "id": 8 } });

            const daoMock = jest.spyOn(dao, "execSql");
            daoMock.mockReturnValue([{ "get_creator_id": 2 }]);

            const apiClientMock = jest.spyOn(apiClient.prototype, "getWallet");
            apiClientMock.mockReturnValue({
                status: 200,
                message: "unaWallet",
                error: false
            });

            const res = await request.get('/wallet').send();
            expect(res.body.status).toBe(200);
            expect(res.body.error).toBe(false);
            expect(res.body.message).toBe("unaWallet");
        } catch (error) {
            console.log(error.message)
        }
    });

    it('User dont get wallet', async () => {
        try {

            jest.mock('axios');
            const validTokenMock = jest.spyOn(validToken, 'validToken');
            validTokenMock.mockReturnValue(true);

            const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
            tokenDecodeMock.mockReturnValue({ "payload": { "id": 8 } });

            const res = await request.get('/wallet').send();
            expect(res.body.status).toBe(500);
            expect(res.body.error).toBe(true);
        } catch (error) {
            console.log(error.message)
        }
    });


});
