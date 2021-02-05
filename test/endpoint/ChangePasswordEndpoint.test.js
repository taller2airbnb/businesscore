var supertest = require('supertest-as-promised');
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({}); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var ChangePasswordEndpoint = require("../../src/communication/endpoints/ChangePasswordEndpoint.js");

const request = supertest(server);

describe(" Test Suite: ChangePasswordEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new ChangePasswordEndpoint('hard@to.kill');
        expect(endpoint.url()).toBe('/user/hard@to.kill/password/');
        expect(endpoint.method()).toBe('PUT');
        expect(endpoint.needsAuthorization()).toBe(true);
        expect(endpoint.ownResponses().length).toBe(2);
    });

});
