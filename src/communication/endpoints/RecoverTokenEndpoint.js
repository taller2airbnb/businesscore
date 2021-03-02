const Endpoint = require("./Endpoint.js");
const RecoverTokenSuccessful = require("../responses/user/RecoverTokenSuccessful");
const InvalidRecoverToken = require("../responses/user/InvalidRecoverToken");

("use strict");

module.exports = class RecoverTokenEndpoint extends Endpoint {

  constructor(userMail) {
    super();
    this._userMail = userMail;
  }
  
  url() {
    return "/recover_token/" + this._userMail;
  }

  method() {
    return "POST";
  }

  needsAuthorization() {
    return true;
  }

  ownResponses() {
    return [RecoverTokenSuccessful, InvalidRecoverToken];
}
};
