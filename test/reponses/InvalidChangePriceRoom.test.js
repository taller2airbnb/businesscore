var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidChangePriceRoom = require("../../src/communication/responses/smartcontract/InvalidChangePriceRoom.js");

const request = supertest(server);

describe(" Test Suite: InvalidChangePriceRoom", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidChangePriceRoom(['Test Nok',400], 400);

        expect(InvalidChangePriceRoom.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidChangePriceRoom.getMessage()).toBe("Invalid change price room");
        expect(InvalidChangePriceRoom.understandThis(400)).toBe(true);
        
    });

});
