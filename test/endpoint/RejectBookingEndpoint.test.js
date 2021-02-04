var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var RejectBookingEndpoint = require("../../src/communication/endpoints/RejectBookingEndpoint.js");

const request = supertest(server);

describe(" Test Suite: RejectBookingEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new RejectBookingEndpoint(8);
        expect(endpoint.url()).toBe("/rejectBooking");
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(false);
    });

});
