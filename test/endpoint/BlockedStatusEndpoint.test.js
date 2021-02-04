var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var BlockedStatusEndpoint = require("../../src/communication/endpoints/BlockedStatusEndpoint.js");
var InvalidBlockedStatus = require("../../src/communication/responses/user/InvalidBlockedStatus.js");
var BlockedStatusSuccessful = require("../../src/communication/responses/user/BlockedStatusSuccessful");

const request = supertest(server);

describe(" Test Suite: BlockedStatusEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new BlockedStatusEndpoint(2);
        expect(endpoint.url()).toBe('/user/2/blocked_status/');
        expect(endpoint.method()).toBe('PUT');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
