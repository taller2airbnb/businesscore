const Endpoint = require("./Endpoint.js");
const NewRoomSuccessful = require("../responses/smartcontract/NewRoomSuccessful");
const InvalidNewRoom = require("../responses/smartcontract/InvalidNewRoom");


module.exports = class RegisterUserRoomEndpoint extends Endpoint {
    static url() {
        return '/room'
    }

    ownResponses() {
        return [NewRoomSuccessful, InvalidNewRoom];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}