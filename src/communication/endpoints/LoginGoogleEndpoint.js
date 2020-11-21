const Endpoint = require("./Endpoint.js");
const LoginGoogleSuccessful = require("../responses/login/LoginGoogleSuccessful");
const InvalidCredentials = require("../responses/login/InvalidCredentials");

module.exports = class LoginGoogleEndpoint extends Endpoint {
    static url() {
        return '/google_auth/login'
    }

    ownResponses() {
        return [LoginGoogleSuccessful, InvalidCredentials];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}