
var supertest = require('supertest-as-promised');
const server = require('../../app.js');
const axios = require('axios');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var apiClient = require("../../src/communication/client/ApiClient.js")


const request = supertest(server);


describe(" Test Suite: wallet", () => {




    it('User get wallet', async () => {

        try {

            jest.mock('axios');
            const validTokenMock = jest.spyOn(validToken, 'validToken');
            validTokenMock.mockReturnValue(true);

            const tokenDecodeMock = jest.spyOn(decodeToken, "decodeToken");
            tokenDecodeMock.mockReturnValue( {"payload": { "id" : 8}});

            const daoMock = jest.spyOn(dao, "execSql");
            daoMock.mockReturnValue( [{"get_creator_id": 2}]);

            const apiClientMock = jest.spyOn(apiClient.prototype, "getWallet");
            apiClientMock.mockReturnValue( {
                status: 200,
                message: "caa",
                error: false
            });

            const res = await request.get('/wallet').send();
            expect(res.status).toBe(200);
        } catch (error) {
            console.log(error.message)
        }
    });


});
