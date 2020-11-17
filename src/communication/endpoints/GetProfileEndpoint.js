const Endpoint = require("./Endpoint.js");
const LoginSuccessful = require("../responses/login/LoginSuccessful");
const InvalidCredentials = require("../responses/login/InvalidCredentials");

module.exports = class ProfileEndpoint extends Endpoint {
    static url() {
        return '/profiles/'
    }

    method() {
        return 'GET'
    }

    needsAuthorization() {
        return false;
    }
}