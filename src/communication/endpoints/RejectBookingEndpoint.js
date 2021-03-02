const Endpoint = require("./Endpoint.js");
const RejectBookingSuccessful = require("../responses/smartcontract/RejectBookingSuccessful");
const InvalidRejectBooking = require("../responses/smartcontract/InvalidRejectBooking");


module.exports = class RejectBookingEndpoint extends Endpoint {
    static url() {
        return '/rejectBooking'
    }

    ownResponses() {
        return [RejectBookingSuccessful, InvalidRejectBooking];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}