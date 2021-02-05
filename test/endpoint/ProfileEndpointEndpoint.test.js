var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var ProfileEndpoint = require("../../src/communication/endpoints/GetProfileEndpoint.js");

const request = supertest(server);

describe(" Test Suite: ProfileEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new ProfileEndpoint();
        expect(endpoint.url()).toBe('/profiles/');
        expect(endpoint.method()).toBe('GET');
        expect(endpoint.needsAuthorization()).toBe(true);
    });

});
