var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var UpdateUserEndpoint = require("../../src/communication/endpoints/UpdateUserEndpoint.js");

const request = supertest(server);

describe(" Test Suite: UpdateUserEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new UpdateUserEndpoint();
        expect(endpoint.url()).toBe("/user/");
        expect(endpoint.method()).toBe('PUT');
        expect(endpoint.needsAuthorization()).toBe(true);
        expect(endpoint.ownResponses().length).toBe(2);
    });

});
