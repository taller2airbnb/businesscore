var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var Response = require("../../src/communication/responses/Response.js");

const request = supertest(server);

describe(" Test Suite: Response", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {

        endpoint = new Response({message: 'Test ok'}, 200);

        try {
            Endpoint.defaultResponse();
        } catch (error) {
            expect(error.message).toBe("Endpoint is not defined");
        }

        expect(Response.understandThis(400)).toBe(true);
        expect(endpoint.description()).toBe("¡Ha ocurrido un error!");
        expect(endpoint.hasBodyMessage()).toBe(true);
        expect(Response.hasBodyMessage()).toBe(false);
        expect(endpoint.statusCode()).toBe(200);
        expect(Response.statusCode()).toBe(400);
        expect(endpoint.getMessage().message).toBe('Test ok');
        expect(endpoint.isError()).toBe(false);
        expect(Response.hasError()).toBe(true);
        
        
    });

});
