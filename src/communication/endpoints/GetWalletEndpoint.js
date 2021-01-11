const Endpoint = require("./Endpoint.js");
const GetWalletSuccessful = require("../responses/smartcontract/GetWalletSuccessful");
const InvalidGetWallet = require("../responses/smartcontract/InvalidGetWallet");

("use strict");

module.exports = class GetWallet extends (
  Endpoint
) {
  constructor(creator_id) {
    super();
    this._creator_id = creator_id;
  }

  url() {
    return "/wallet?creatorId=" + this._creator_id;
  }

  method() {
    return "GET";
  }

  needsAuthorization() {
    return false;
  }

  ownResponses() {
    return [GetWalletSuccessful, InvalidGetWallet];
  }
};
