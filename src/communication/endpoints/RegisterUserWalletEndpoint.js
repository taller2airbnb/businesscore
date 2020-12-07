const Endpoint = require("./Endpoint.js");
const NewIdentitySuccessful = require("../responses/smartcontract/NewIdentitySuccessful");
const InvalidUpdate = require("../responses/user/InvalidUpdate");

module.exports = class RegisterUserWalletEndpoint extends Endpoint {
    static url() {
        return '/identity'
    }

    ownResponses() {
        return [NewIdentitySuccessful];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}