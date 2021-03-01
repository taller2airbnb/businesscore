var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var ServerErrorResponse = require("../../src/communication/responses/generalResponses/ServerErrorResponse.js");

const request = supertest(server);

describe(" Test Suite: ServerErrorResponse", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new ServerErrorResponse({message: 'Test ok', status: 500}, 500);
        expect(ServerErrorResponse.understandThis({status: 500})).toBe(true);
        expect(endpoint.hasError()).toBe(true);
        expect(endpoint.content()).toBe("Server error code: 500");
        expect(endpoint.errors().length).toBe(1);
    });

});
