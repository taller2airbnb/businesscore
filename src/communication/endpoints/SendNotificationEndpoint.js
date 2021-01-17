const Endpoint = require("./Endpoint.js");
const SendNotificactionSuccessful = require("../responses/profiles/SendNotificationSuccessful");
const InvalidSendNotificaction = require("../responses/profiles/InvalidSendNotification");

("use strict");

module.exports = class SendNotificactionEndpoint extends (
  Endpoint
) {
  url() {
    return "push/send";
  }

  method() {
    return "POST";
  }

  needsAuthorization() {
    return false;
  }

  ownResponses() {
    return [SendNotificactionSuccessful, InvalidSendNotificaction];
  }
};
