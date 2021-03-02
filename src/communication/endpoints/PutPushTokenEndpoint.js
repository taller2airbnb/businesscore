const Endpoint = require("./Endpoint.js");
const PutPushTokenSuccessful = require("../responses/profiles/PutPushTokenSuccessful");
const InvalidPutPushToken = require("../responses/profiles/InvalidPutPushToken");

("use strict");

module.exports = class PutPushTokenEndpoint extends (
  Endpoint
) {
  constructor(user_id) {
    super();
    this._user_id = user_id;
  }

  url() {
    return "/user/" + this._user_id  + "/push_token/";
  }

  method() {
    return "PUT";
  }

  needsAuthorization() {
    return true;
  }

  ownResponses() {
    return [PutPushTokenSuccessful, InvalidPutPushToken];
  }
};
