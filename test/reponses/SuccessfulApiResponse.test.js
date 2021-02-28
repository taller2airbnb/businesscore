var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var SuccessfulApiResponse = require("../../src/communication/responses/generalResponses/SuccessfulApiResponse.js");

const request = supertest(server);

describe(" Test Suite: SuccessfulApiResponse", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new SuccessfulApiResponse({message: 'Test ok', status: 200}, 200);

        try {
            SuccessfulApiResponse.defaultResponse();
        } catch (error) {
            expect(error.message).toBe("You have to implement the method");
        }

        expect(SuccessfulApiResponse.understandThis(200)).toBe(true);
        expect(SuccessfulApiResponse.isError()).toBe(false);

    });

});
