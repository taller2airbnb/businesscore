var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var ErrorApiResponse = require("../../src/communication/responses/generalResponses/ErrorApiResponse.js");

const request = supertest(server);

describe(" Test Suite: ErrorApiResponse", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new ErrorApiResponse({message: 'Test ok'}, 400);

        try {
            Endpoint.defaultResponse();
        } catch (error) {
            expect(error.message).toBe("Endpoint is not defined");
        }

        expect(ErrorApiResponse.statusCode()).toBe(400);
        expect(ErrorApiResponse.isError()).toBe(true);
        expect(endpoint.getMessage().message).toBe('Test ok');
        expect(ErrorApiResponse.understandThis(400)).toBe(true);

        expect(endpoint.description()).toBe("¡Ha ocurrido un error!");
        expect(endpoint.hasBodyMessage()).toBe(true);
        expect(ErrorApiResponse.hasBodyMessage()).toBe(false);
    });

});
