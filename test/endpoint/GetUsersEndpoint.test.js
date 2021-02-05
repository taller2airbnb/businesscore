var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var GetUsersEndpoint = require("../../src/communication/endpoints/GetUsersEndpoint.js");

const request = supertest(server);

describe(" Test Suite: GetUsersEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new GetUsersEndpoint();
        expect(endpoint.url()).toBe('/user/');
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(true);
        expect(endpoint.ownResponses().length).toBe(2);
    });

});
