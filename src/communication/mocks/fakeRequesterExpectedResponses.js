const GetProfileEndpoint = require("../endpoints/GetProfileEndpoint");
const GetProfileSuccessful = require("../responses/profiles/GetProfileSuccessful");
const LoginEndpoint = require("../endpoints/LoginEndpoint");
const LoginSuccessful = require("../endpoints/LoginSuccessful");
const InvalidCredentials = require("../endpoints/InvalidCredentials");

("use strict");

module.exports = fakeRequesterExpectedResponses = () => {
    return {
        [GetProfileEndpoint.name]: GetProfileSuccessful,
        [LoginEndpoint.name]: LoginSuccessful,
    }
};