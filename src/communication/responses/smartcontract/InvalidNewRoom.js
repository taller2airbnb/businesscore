const ErrorApiResponse = require("../generalResponses/ErrorApiResponse.js");
("use strict");

module.exports = class InvalidNewRoom extends ErrorApiResponse {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }

  constructor(result) {
    super(result[0], result[1]);
  }

  static getMessage() {
    return "Invalid create room";
  }

  static understandThis(status) {
    return (status == 400 || status == 403 || status == 404
         || status == 409 || status == 401 || status == 500);
}



};
