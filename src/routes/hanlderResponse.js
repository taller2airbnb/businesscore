module.exports.handlerResponse = async function (response) {
  resp = {};
  resp["status"] = response.statusCode();
  if (response.hasBodyMessage())  resp["message"] = await response.getMessage()
  else resp["message"] = response.getMessage() 
  return resp;
};
