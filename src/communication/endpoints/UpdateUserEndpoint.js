const Endpoint = require("./Endpoint.js");
const UpdateSuccessful = require("../responses/user/UpdateSuccessful");
const InvalidUpdate = require("../responses/user/InvalidUpdate");

module.exports = class UpdateUserEndpoint extends Endpoint {
    static url() {
        return '/user/modify/'
    }

    ownResponses() {
        return [UpdateSuccessful, InvalidUpdate];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}