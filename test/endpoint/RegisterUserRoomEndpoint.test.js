var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var RegisterUserRoomEndpoint = require("../../src/communication/endpoints/RegisterUserRoomEndpoint.js");

const request = supertest(server);

describe(" Test Suite: RegisterUserRoomEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new RegisterUserRoomEndpoint();
        expect(endpoint.url()).toBe('/room');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(false);
    });

});
