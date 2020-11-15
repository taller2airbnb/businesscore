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
router.get("/posting", async (req, res) => {
  const future =  dao.execSql("get_all_posting", []);
  future.then(result => {
    res.send(JSON.stringify({ result: result }));
  });
});



module.exports = router;
