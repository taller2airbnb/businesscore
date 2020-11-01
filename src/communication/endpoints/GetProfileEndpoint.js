const { Endpoint } = require('./Endpoint.js');
const { GetProfileSuccessful } = require('../responses/profiles/GetProfileSuccessful.js');

'use strict';

module.exports = class GetProfileEndpoint extends Endpoint {
    static url() {
        return '/users/2'
    }

    ownResponses() {
        return [GetProfileSuccessful];
    }

    method() {
        return 'GET'
    }

    needsAuthorization() {
        return false;
    }
}