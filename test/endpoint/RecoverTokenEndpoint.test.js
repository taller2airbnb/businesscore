var supertest = require('supertest-as-promised'); 
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
    });

    it('Endpoint construct', async () => {
        endpoint = new RecoverTokenEndpoint('hard@to.kill');
        expect(endpoint.url()).toBe('/recover_token/hard@to.kill');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
