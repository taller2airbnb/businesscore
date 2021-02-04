var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var TransactionsEndpoint = require("../../src/communication/endpoints/TransactionsEndpoint.js");

const request = supertest(server);

describe(" Test Suite: UpdateUserEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new TransactionsEndpoint();
        expect(endpoint.url()).toBe("/transactions");
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(false);
    });

});
