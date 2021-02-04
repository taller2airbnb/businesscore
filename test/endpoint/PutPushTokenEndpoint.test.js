var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var PutPushTokenEndpoint = require("../../src/communication/endpoints/PutPushTokenEndpoint.js");

const request = supertest(server);

describe(" Test Suite: PutPushTokenEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new PutPushTokenEndpoint(8);
        expect(endpoint.url()).toBe("/user/8/push_token/");
        expect(endpoint.method()).toBe('PUT');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
