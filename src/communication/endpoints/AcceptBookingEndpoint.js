const Endpoint = require("./Endpoint.js");
const AcceptBookingSuccessful = require("../responses/smartcontract/AcceptBookingSuccessful");
const InvalidAcceptBooking = require("../responses/smartcontract/InvalidAcceptBooking");


module.exports = class AcceptBookingEndpoint extends Endpoint {
    static url() {
        return '/acceptBooking'
    }

    ownResponses() {
        return [AcceptBookingSuccessful, InvalidAcceptBooking];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}