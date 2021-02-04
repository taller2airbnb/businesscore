var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var SendNotificationEndpoint = require("../../src/communication/endpoints/SendNotificationEndpoint.js");

const request = supertest(server);

describe(" Test Suite: SendNotificationEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new SendNotificationEndpoint();
        expect(endpoint.url()).toBe('push/send');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(false);
    });

});
