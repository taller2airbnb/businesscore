var jwt = require('jsonwebtoken')

module.exports.validToken = function (req, res) {

  var token = req.headers['authorization']
  if (!token) {
    res.status(401).send({
      message: "Es necesario el token de autenticación",
      status:401,
      error:true
    })
    return false;
  }

  token = token.replace('Bearer ', '')
  jwt.verify(token, 'Secret Password', function (err, user) {
    if (err) {
      res.status(401).send({
        message: 'Token inválido',
        status:401,
        error:true
      })
      return false;
    }

  })

  return true;
};


module.exports.decodeToken = function (req, res) {
  var token = req.headers['authorization']
  return jwt.decode(token, {
    complete: true
  });
};
