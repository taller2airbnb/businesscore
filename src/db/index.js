const initOptions = {
  // global event notification;
  schema: ["public", "business_core_schema"],
  error: (error, e) => {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.log("CN:", e.cn);
      console.log("EVENT:", error.message || error);
    }
  },
};

const pgp = require("pg-promise")(initOptions);
const connection = require("./config");
const db = pgp(connection.config);
  

exports.execSql = async function (sqlStore, ...args) {
  let sco; // shared connection object;
  return await db.func(sqlStore, args[0])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    })
    .finally(() => {
      // release the connection, if it was successful:
      if (sco) {
        // if you pass `true` into method done, i.e. done(true),
        // it will make the pool kill the physical connection.
        sco.done();
      }
    });
};

exports.inicialize = async function (sqlStore, ...args) {
  return await db.connect();
};
