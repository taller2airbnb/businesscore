var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var Endpoint = require("../../src/communication/endpoints/Endpoint.js");

const request = supertest(server);

describe(" Test Suite: Endpoint", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new Endpoint('2');
        expect(endpoint.contentType()).toBe("application/json");

        try {
            Endpoint.url();
        } catch (error) {
            expect(error.message).toBe("You have to implement the method");
        }

        try {
            endpoint.url();
        } catch (error) {
            expect(error.message).toBe("You have to implement the method");
        }

        try {
            endpoint.method();
        } catch (error) {
            expect(error.message).toBe("You have to implement the method");
        }

        expect(endpoint.needsAuthorization()).toBe(false);
        expect(endpoint.generalResponses().length).toBe(1);
        expect(endpoint.responses().length).toBe(1);
    });

});
