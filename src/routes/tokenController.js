var jwt = require('jsonwebtoken')

module.exports.validToken = function (req, res) {
    
    var token = req.headers['authorization']
    if(!token){
      res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, 'Secret Password', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      }
    })
};


module.exports.decodeToken = function (req, res) {
  var token = req.headers['authorization']
  return jwt.decode(token, {
    complete: true
   });
};
