module.exports.handlerResponse = function (response) {
  if (response.hasError()) {
    console.log(response.errorMessages());
    return response.errorMessages();
  } else {
    console.log(response._jsonResponse);
    return response._jsonResponse;
  }
};
