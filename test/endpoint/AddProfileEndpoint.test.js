var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var AddProfileEndpoint = require("../../src/communication/endpoints/AddProfileEndpoint.js");

const request = supertest(server);

describe(" Test Suite: AddProfileEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new AddProfileEndpoint();
        expect(endpoint.url()).toBe("/profiles/add/");
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
