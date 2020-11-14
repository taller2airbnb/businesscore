const { Pool } = require('pg')
const config = require("./config");

exports.execSql = async function (sqlStore, ...args) {
  const pool =  new Pool(config)
  pool.on("error", err => {
    throw err;
  });

  try {
    await pool.connect();
    let request = pool.request();

    args.forEach(element => {
      request.input(element.nombre, element.valor);
    });
    //request.input("fechaDesde", sql.VarChar, fechaDesde);

    let result = await request.execute(sqlStore);
    return { success: result.recordset };
  } catch (err) {
    return { err: err };
  } finally {
    pool.close(); //closing connection after request is finished.
  }
};