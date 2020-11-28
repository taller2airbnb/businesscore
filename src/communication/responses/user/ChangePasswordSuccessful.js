const SuccessfulApiResponse = require("../generalResponses/SuccessfulApiResponse.js");
("use strict");

module.exports = class ChangePasswordSuccessful extends SuccessfulApiResponse {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }

  static understandThis(response) {
    return response.status >= 200 && response.status < 300  ;
  }

  static getMessage() {
    return "Credential changed successful";
  }

  static hasError(){
    return false;
  }

  static statusCode(){
    return 200;
  }
};
