var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var ProfileEndpoint = require("../../src/communication/endpoints/GetProfileEndpoint.js");

const request = supertest(server);

describe(" Test Suite: ProfileEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new ProfileEndpoint();
        expect(endpoint.url()).toBe('/profiles/');
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
