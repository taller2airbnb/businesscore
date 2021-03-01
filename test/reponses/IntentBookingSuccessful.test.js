var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var IntentBookingSuccessful = require("../../src/communication/responses/smartcontract/IntentBookingSuccessful.js");

const request = supertest(server);

describe(" Test Suite: IntentBookingSuccessful", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new IntentBookingSuccessful(['Test Nok',200], 200);
        expect(IntentBookingSuccessful.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");        
    });

});
