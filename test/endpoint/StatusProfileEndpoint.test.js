var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var StatusProfileEndpoint = require("../../src/communication/endpoints/StatusProfileEndpoint.js");

const request = supertest(server);

describe(" Test Suite: StatusProfileEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new StatusProfileEndpoint();
        expect(endpoint.url()).toBe("/health");
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
