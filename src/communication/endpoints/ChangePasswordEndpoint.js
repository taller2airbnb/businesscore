const Endpoint = require("./Endpoint.js");
const ChangePasswordSuccessful = require("../responses/user/ChangePasswordSuccessful");
const InvalidCredentials = require("../responses/login/InvalidCredentials");

module.exports = class ChangePasswordEndpoint extends Endpoint {
    static url() {
        return '/change_password/'
    }

    ownResponses() {
        return [ChangePasswordSuccessful, InvalidCredentials];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}