var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var UpdateUserEndpoint = require("../../src/communication/endpoints/UpdateUserEndpoint.js");

const request = supertest(server);

describe(" Test Suite: UpdateUserEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new UpdateUserEndpoint();
        expect(endpoint.url()).toBe("/user/");
        expect(endpoint.method()).toBe('PUT');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
