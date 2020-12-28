const Endpoint = require("./Endpoint.js");
const BlockedStatusSuccessful = require("../responses/user/BlockedStatusSuccessful");
const InvalidBlockedStatus = require("../responses/user/InvalidBlockedStatus");

("use strict");

module.exports = class BlockedStatusEndpoint extends Endpoint {

  constructor(user_id) {
    super();
    this._user_id = user_id;
  }
  
  url() {
    return "/user/" +  this._user_id + "/blocked_status/";
  }

  method() {
    return "PUT";
  }

  needsAuthorization() {
    return false;
  }

  ownResponses() {
    return [BlockedStatusSuccessful, InvalidBlockedStatus];
}
};
