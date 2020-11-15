const initOptions = {
  // global event notification;
  error: (error, e) => {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log('CN:', e.cn);
      console.log('EVENT:', error.message || error);
    }
  }
};

const pgp = require('pg-promise')(initOptions);
const connection = require("./config");


exports.execSql = async function (sqlStore, ...args) {


  const db = pgp(connection.config)
  try {
    db.connect()


      .then(obj => {
        return obj.proc(sqlStore, [])
      })
      .catch(error => {
        console.log('ERROR:', error.message || error);
      });

  } catch (err) {
    return { err: err };
  }
};