const SuccessfulApiResponse = require("../generalResponses/SuccessfulApiResponse.js");
("use strict");

module.exports = class NewProfileSuccessful extends SuccessfulApiResponse {
  static defaultResponse() {
    return {
      token: "QpwL5tke4Pnpja7X4",
    };
  }

  static understandThis(response) {
    return response.status >= 200 && response.status < 300;
  }

  constructor(jsonResponse) {
    super(jsonResponse);
    this._jsonResponse = jsonResponse;
  }

  getMessage() {
    return "Register successful";
  }

  hasError(){
    return false;
  }

  statusCode(){
    return 200;
  }

  getJson(){
    return this._jsonResponse;
  }
};
