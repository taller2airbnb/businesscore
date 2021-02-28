var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidCredentials = require("../../src/communication/responses/login/InvalidCredentials.js");

const request = supertest(server);

describe(" Test Suite: InvalidCredentials", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {

        endpoint = new InvalidCredentials(['Test Nok',400], 400);

        expect(InvalidCredentials.defaultResponse().error).toBe("Missing password");
        expect(InvalidCredentials.getMessage()).toBe("Invalid data to login");
        
    });

});
