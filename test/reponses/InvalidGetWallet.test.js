var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidGetWallet = require("../../src/communication/responses/smartcontract/InvalidGetWallet.js");

const request = supertest(server);

describe(" Test Suite: InvalidGetWallet", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidGetWallet(['Test Nok',400], 400);

        expect(InvalidGetWallet.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidGetWallet.getMessage()).toBe("Invalid get wallet");
        expect(InvalidGetWallet.understandThis(400)).toBe(true);
        
    });

});
