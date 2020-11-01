const GetProfileEndpoint = require("../endpoints/GetProfileEndpoint");
const GetProfileSuccessful = require("../responses/profiles/GetProfileSuccessful");
const LoginEndpoint = require("../endpoints/LoginEndpoint");
const LoginSuccessful = require("../responses/login/LoginSuccessful");
const InvalidCredentials = require("../responses/login/InvalidCredentials");

("use strict");

module.exports = fakeRequesterExpectedResponses = () => {
    return {
        [GetProfileEndpoint.name]: GetProfileSuccessful,
        [LoginEndpoint.name]: LoginSuccessful,
    }
};