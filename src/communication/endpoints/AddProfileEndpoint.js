const Endpoint = require("./Endpoint.js");
const NewProfileSuccessful = require("../responses/profiles/NewProfileSuccessful");
const InvalidNewGetProfile = require("../responses/profiles/InvalidNewGetProfile");

module.exports = class AddProfileEndpoint extends Endpoint {
    static url() {
        return '/profiles/add/'
    }

    ownResponses() {
        return [NewProfileSuccessful, InvalidNewGetProfile];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return true;
    }
}