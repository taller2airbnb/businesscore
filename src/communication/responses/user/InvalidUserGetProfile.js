const ErrorApiResponse = require("../generalResponses/ErrorApiResponse.js");
("use strict");

module.exports = class InvalidNewGetProfile extends ErrorApiResponse {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }

  constructor(jsonResponse) {
    super(jsonResponse);
    this._jsonResponse = jsonResponse;
  }

  static getMessage() {
    return "Invalid data to register";
  }

  static understandThis(status) {
    return status == 400;
  }
  
  static statusCode(){
    return 400;
  }
};
