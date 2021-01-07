const Endpoint = require("./Endpoint.js");
const ChangePriceRoomSuccessful = require("../responses/smartcontract/ChangePriceRoomSuccessful");
const InvalidChangePriceRoom = require("../responses/smartcontract/InvalidChangePriceRoom");


module.exports = class ChangePriceRoomEndpoint extends Endpoint {
    static url() {
        return '/changePriceRoom'
    }

    ownResponses() {
        return [ChangePriceRoomSuccessful, InvalidChangePriceRoom];
    }

    method() {
        return 'PUT'
    }

    needsAuthorization() {
        return false;
    }
}