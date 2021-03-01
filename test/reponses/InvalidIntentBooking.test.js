var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidIntentBooking = require("../../src/communication/responses/smartcontract/InvalidIntentBooking.js");

const request = supertest(server);

describe(" Test Suite: InvalidIntentBooking", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidIntentBooking(['Test Nok',400], 400);

        expect(InvalidIntentBooking.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidIntentBooking.getMessage()).toBe("Invalid intent booking");
        expect(InvalidIntentBooking.understandThis(400)).toBe(true);
        
    });

});
