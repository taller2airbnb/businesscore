var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var TransactionsEndpoint = require("../../src/communication/endpoints/TransactionsEndpoint.js");

const request = supertest(server);

describe(" Test Suite: UpdateUserEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new TransactionsEndpoint();
        expect(endpoint.url()).toBe("/transactions");
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(false);
        expect(endpoint.ownResponses().length).toBe(2);
    });

});
