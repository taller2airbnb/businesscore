const Endpoint = require("./Endpoint.js");
const GetProfileSuccessful = require("../responses/profiles/GetProfileSuccessful");
const InvalidGetProfile = require("../responses/profiles/InvalidGetProfile");

module.exports = class ProfileEndpoint extends Endpoint {
    static url() {
        return '/profiles/'
    }

    ownResponses() {
        return [GetProfileSuccessful, InvalidGetProfile];
    }

    method() {
        return 'GET'
    }

    needsAuthorization() {
        return false;
    }
}