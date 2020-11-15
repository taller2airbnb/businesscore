const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options('*', cors());
const dao = require("../db/index");

/**
 * @swagger
 * /posting:
 *    get:
 *      description: all posting
 *      responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting", (req, res) => {
    debugger;
    let result =  dao.execSql("business_core_schema.get_all_posting", {})
    // .then(resultado => {
    //   if (resultado.err) throw new Error(resultado.err.message);
    //   else res.send(JSON.stringify({ result: resultado.success }));

    // })
    // .catch(err => {
    //   throw err;
    // });
});


module.exports = router;
