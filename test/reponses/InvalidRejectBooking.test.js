var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidRejectBooking = require("../../src/communication/responses/smartcontract/InvalidRejectBooking.js");

const request = supertest(server);

describe(" Test Suite: InvalidRejectBooking", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidRejectBooking(['Test Nok',400], 400);

        expect(InvalidRejectBooking.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidRejectBooking.getMessage()).toBe("Invalid reject booking");
        expect(InvalidRejectBooking.understandThis(400)).toBe(true);
        
    });

});
