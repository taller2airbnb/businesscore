var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidNewRoom = require("../../src/communication/responses/smartcontract/InvalidNewRoom.js");

const request = supertest(server);

describe(" Test Suite: InvalidNewRoom", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});
    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidNewRoom(['Test Nok',400], 400);

        expect(InvalidNewRoom.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");
        expect(InvalidNewRoom.getMessage()).toBe("Invalid create room");
        expect(InvalidNewRoom.understandThis(400)).toBe(true);
        
    });

});
