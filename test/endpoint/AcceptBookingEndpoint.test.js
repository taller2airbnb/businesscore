var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var AcceptBookingEndpoint = require("../../src/communication/endpoints/AcceptBookingEndpoint.js");

const request = supertest(server);

describe(" Test Suite: AcceptBookingEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new AcceptBookingEndpoint();
        expect(endpoint.url()).toBe('/acceptBooking');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(false);
        expect(endpoint.ownResponses().length).toBe(2);
    });

});