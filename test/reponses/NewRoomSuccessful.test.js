var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var NewRoomSuccessful = require("../../src/communication/responses/smartcontract/NewRoomSuccessful.js");

const request = supertest(server);

describe(" Test Suite: NewRoomSuccessful", () => {

    beforeEach(() => {
        jest.resetAllMocks();
        dbMock.mockResolvedValueOnce({});

    });

    it('Endpoint construct', async () => {
        endpoint = new NewRoomSuccessful(['Test Nok',200], 200);
        expect(NewRoomSuccessful.defaultResponse().token).toBe("QpwL5tke4Pnpja7X4");        
    });

});
