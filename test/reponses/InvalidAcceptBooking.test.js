var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidAcceptBooking = require("../../src/communication/responses/smartcontract/InvalidAcceptBooking.js");

const request = supertest(server);

describe(" Test Suite: InvalidAcceptBooking", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidAcceptBooking(['Test Nok',400], 400);

        expect(InvalidAcceptBooking.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidAcceptBooking.getMessage()).toBe("Invalid accept booking");
        expect(InvalidAcceptBooking.understandThis(400)).toBe(true);
        
    });

});
