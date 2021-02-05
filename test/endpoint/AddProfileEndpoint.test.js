var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var AddProfileEndpoint = require("../../src/communication/endpoints/AddProfileEndpoint.js");

const request = supertest(server);

describe(" Test Suite: AddProfileEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new AddProfileEndpoint();
        expect(endpoint.url()).toBe("/profiles/add/");
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
