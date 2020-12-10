const SuccessfulApiResponse = require("../generalResponses/SuccessfulApiResponse.js");
("use strict");

module.exports = class NewIdentitySuccessful extends SuccessfulApiResponse {

  constructor(result) {
    super(result[0], result[1]);
  }

};
