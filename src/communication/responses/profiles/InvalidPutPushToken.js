const ErrorApiResponse = require("../generalResponses/ErrorApiResponse.js");
("use strict");

module.exports = class InvalidPutPushToken extends ErrorApiResponse {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }

  constructor(result) {
    super(result[0], result[1]);
  }

  static getMessage() {
    return "Invalid change pushToken";
  }

  static understandThis(status) {
    return status == 400;
  }
};
