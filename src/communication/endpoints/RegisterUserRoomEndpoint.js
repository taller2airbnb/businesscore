const Endpoint = require("./Endpoint.js");
const NewRoomSuccessful = require("../responses/smartcontract/NewRoomSuccessful");
const InvalidUpdate = require("../responses/user/InvalidUpdate");

module.exports = class RegisterUserRoomEndpoint extends Endpoint {
    static url() {
        return '/room'
    }

    ownResponses() {
        return [NewRoomSuccessful];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}