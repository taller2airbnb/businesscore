const Endpoint = require("./Endpoint.js");
const IntentBookingSuccessful = require("../responses/smartcontract/IntentBookingSuccessful");
const InvalidIntentBooking = require("../responses/smartcontract/InvalidIntentBooking");


module.exports = class IntentBookingEndpoint extends Endpoint {
    static url() {
        return '/intentBooking'
    }

    ownResponses() {
        return [IntentBookingSuccessful, InvalidIntentBooking];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}