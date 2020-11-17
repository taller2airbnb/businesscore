const Endpoint = require("./Endpoint.js");
const LoginSuccessful = require("../responses/login/LoginSuccessful");
const InvalidCredentials = require("../responses/login/InvalidCredentials");

module.exports = class ChangePasswordEndpoint extends Endpoint {
    static url() {
        return '/change_password/'
    }

    ownResponses() {
        return [LoginSuccessful, InvalidCredentials];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}