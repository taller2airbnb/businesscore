var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var ChangePriceRoomEndpoint = require("../../src/communication/endpoints/ChangePriceRoomEndpoint.js");

const request = supertest(server);

describe(" Test Suite: ChangePriceRoomEndpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Endpoint construct', async () => {
        endpoint = new ChangePriceRoomEndpoint();
        expect(endpoint.url()).toBe('/changePriceRoom');
        expect(endpoint.method()).toBe('PUT');
        expect(endpoint.needsAuthorization()).toBe(false);
    });

});
