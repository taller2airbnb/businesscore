var supertest = require('supertest-as-promised'); 
var dao = require("../../src/db/index");
const dbMock = jest.spyOn(dao, "inicialize");
dbMock.mockResolvedValueOnce({});
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");
var jwt = require('jsonwebtoken');
var InvalidNewGetProfile = require("../../src/communication/responses/profiles/InvalidNewGetProfile");

const request = supertest(server);

describe(" Test Suite: InvalidNewGetProfile", () => {

    it('Endpoint construct', async () => {
        let pojo  = new InvalidNewGetProfile([200,"unMensaje"])
        expect(InvalidNewGetProfile.getMessage()).toBe("Invalid data profile");
        expect(InvalidNewGetProfile.understandThis(400)).toBe(true);
    });

});
