const initOptions = {
  // global event notification;
  schema: ['public','business_core_schema'],
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


  const db = pgp(connection.config);
  const result = null;;
  let sco; // shared connection object;
  let data1;
  try {
    await db.connect()
      .then(obj => {
        sco = obj;
        return  obj.func(sqlStore, []);
      })
      .then(data => {
        console.log(data);
        data1 = data;
        return data;
      })
      .catch(error => {
        console.log('ERROR:', error.message || error);
      });

  } catch (err) {
    return { err: err };
  }finally{
    if (sco) {
      // if you pass `true` into method done, i.e. done(true),
      // it will make the pool kill the physical connection.
      sco.done();
    }
    return data1;
  }
};