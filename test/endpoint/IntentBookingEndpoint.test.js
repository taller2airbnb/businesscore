var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var IntentBookingEndpoint = require("../../src/communication/endpoints/IntentBookingEndpoint.js");

const request = supertest(server);

describe(" Test Suite: IntentBookingEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new IntentBookingEndpoint();
        expect(endpoint.url()).toBe('/intentBooking');
        expect(endpoint.method()).toBe('POST');
        expect(endpoint.needsAuthorization()).toBe(false);
    });

});
