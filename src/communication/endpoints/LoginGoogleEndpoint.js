const Endpoint = require("./Endpoint.js");
const LoginSuccessful = require("../responses/login/LoginSuccessful");
const InvalidCredentials = require("../responses/login/InvalidCredentials");

module.exports = class LoginGoogleEndpoint extends Endpoint {
    static url() {
        return '/google_auth/login'
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