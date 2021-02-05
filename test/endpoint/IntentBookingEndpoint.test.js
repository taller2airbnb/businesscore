var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var IntentBookingEndpoint = require("../../src/communication/endpoints/IntentBookingEndpoint.js");

const request = supertest(server);

describe(" Test Suite: IntentBookingEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new IntentBookingEndpoint();
        expect(endpoint.url()).toBe('/intentBooking');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(false);
        expect(endpoint.ownResponses().length).toBe(2);
    });

});
