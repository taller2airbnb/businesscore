var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidTransactions = require("../../src/communication/responses/smartcontract/InvalidTransactions.js");

const request = supertest(server);

describe(" Test Suite: InvalidTransactions", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});
    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidTransactions(['Test Nok',400], 400);

        expect(InvalidTransactions.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidTransactions.getMessage()).toBe("Invalid get all transactions");
        expect(InvalidTransactions.understandThis(400)).toBe(true);
        
    });

});
