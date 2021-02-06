var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var GetWalletSuccessful = require("../../src/communication/responses/smartcontract/GetWalletSuccessful.js");

const request = supertest(server);

describe(" Test Suite: GetWalletSuccessful", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new GetWalletSuccessful(['Test Nok',200], 200);
        expect(GetWalletSuccessful.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");        
    });

});
