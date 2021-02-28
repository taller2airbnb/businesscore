var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidNewIdentidy = require("../../src/communication/responses/smartcontract/InvalidNewIdentidy.js");

const request = supertest(server);

describe(" Test Suite: InvalidNewIdentidy", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});
    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidNewIdentidy(['Test Nok',400], 400);

        expect(InvalidNewIdentidy.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidNewIdentidy.getMessage()).toBe("Invalid create wallet");
        expect(InvalidNewIdentidy.understandThis(400)).toBe(true);
        
    });

});
