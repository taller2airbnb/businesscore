const Endpoint = require("./Endpoint.js");
const TransactionsSuccessful = require("../responses/smartcontract/TransactionsSuccessful");
const InvalidTransactions = require("../responses/smartcontract/InvalidTransactions");

("use strict");

module.exports = class TransactionsEndpoint extends (
  Endpoint
) {
  constructor() {
    super();
  }

  url() {
    return "/transactions";
  }

  method() {
    return "GET";
  }

  needsAuthorization() {
    return false;
  }

  ownResponses() {
    return [TransactionsSuccessful, InvalidTransactions];
  }
};
