const Endpoint = require("./Endpoint.js");
const NewIdentitySuccessful = require("../responses/smartcontract/NewIdentitySuccessful");
const InvalidNewIdentidy = require("../responses/smartcontract/InvalidNewIdentidy");



module.exports = class RegisterUserWalletEndpoint extends Endpoint {
    static url() {
        return '/identity'
    }

    ownResponses() {
        return [NewIdentitySuccessful,InvalidNewIdentidy];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}