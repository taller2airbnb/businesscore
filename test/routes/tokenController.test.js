var supertest = require('supertest-as-promised'); 
const server = require('../../app.js');
var validToken = require("../../src/routes/tokenController.js");
var decodeToken = require("../../src/routes/tokenController.js");
var dao = require("../../src/db/index");

const request = supertest(server);

describe(" Test Suite: tokenController", () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Valid token', async () => {
        req = { headers: { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcmRAdG8ua2lsbCIsInByb2ZpbGUiOjIsImlkIjozLCJpYXQiOjE2MTIyOTU2MDgsImV4cCI6MTYxMjM4MjAwOH0.SdzNBydlVwCbRmJRChTDTiDMDlnAjqIRmoKFc-NSeWs' } }
        expect(validToken.validToken(req)).toBe(true);
    });

    it('Decode token', async () => {
        req = { headers: { authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcmRAdG8ua2lsbCIsInByb2ZpbGUiOjIsImlkIjozLCJpYXQiOjE2MTIyOTU2MDgsImV4cCI6MTYxMjM4MjAwOH0.SdzNBydlVwCbRmJRChTDTiDMDlnAjqIRmoKFc-NSeWs' } }
        res = { header: { alg: "HS256", typ: "JWT"}, payload: {exp: 1612382008, iat: 1612295608, id: 3, profile: 2, username: "hard@to.kill"}, signature: "SdzNBydlVwCbRmJRChTDTiDMDlnAjqIRmoKFc-NSeWs"}
        expect(decodeToken.decodeToken(req)).toStrictEqual(res);
    });

});
