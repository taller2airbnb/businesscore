var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var StatusProfileEndpoint = require("../../src/communication/endpoints/StatusProfileEndpoint.js");

const request = supertest(server);
describe(" Test Suite: StatusProfileEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new StatusProfileEndpoint();
        expect(endpoint.url()).toBe("/health");
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
