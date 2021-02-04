var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var RegisterEndpoint = require("../../src/communication/endpoints/RegisterEndpoint.js");

const request = supertest(server);

describe(" Test Suite: RegisterEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new RegisterEndpoint();
        expect(endpoint.url()).toBe('/user/');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
