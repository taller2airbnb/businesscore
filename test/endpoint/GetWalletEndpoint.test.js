var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var GetWalletEndpoint = require("../../src/communication/endpoints/GetWalletEndpoint.js");

const request = supertest(server);

describe(" Test Suite: GetWalletEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new GetWalletEndpoint('2');
        expect(endpoint.url()).toBe('/wallet?creatorId=2');
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(false);
    });

});
