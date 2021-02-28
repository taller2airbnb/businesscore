var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var NewIdentitySuccessful = require("../../src/communication/responses/smartcontract/NewIdentitySuccessful.js");

const request = supertest(server);

describe(" Test Suite: NewIdentitySuccessful", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new NewIdentitySuccessful(['Test Nok',200], 200);
        expect(NewIdentitySuccessful.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");        
    });

});
