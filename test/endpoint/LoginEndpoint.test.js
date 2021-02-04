var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var LoginEndpoint = require("../../src/communication/endpoints/LoginEndpoint.js");

const request = supertest(server);

describe(" Test Suite: PutPushTokenEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new LoginEndpoint(8);
        expect(endpoint.url()).toBe("/login/");
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
