const SuccessfulApiResponse = require("../generalResponses/SuccessfulApiResponse.js");
("use strict");

module.exports = class NewRoomSuccessful extends SuccessfulApiResponse {

  constructor(_jsonResponse, _statusCode) {
      super(_jsonResponse, _statusCode);
  }

  static understandThis(status) {
    return status == 200;
  }

  static getMessage() {
    return this._jsonResponse;
  }
  
  static getStatusCode() {
    return this._statusCode;
  }
};
