var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var RecoverTokenEndpoint = require("../../src/communication/endpoints/RecoverTokenEndpoint.js");

const request = supertest(server);

describe(" Test Suite: RecoverTokenEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new RecoverTokenEndpoint('hard@to.kill');
        expect(endpoint.url()).toBe('/recover_token/hard@to.kill');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(true);
        expect(endpoint.ownResponses().length).toBe(2);
    });

});
