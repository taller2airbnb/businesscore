const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options('*', cors());
const dao = require("../db/index");
var validToken = require('./tokenController.js');

/**
 * @swagger
 * /posting:
 *    get:
 *     tags:
 *       - posting
 *     description: all posting
 *     security:
 *       - bearerAuth: []
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("get_all_posting", []);
  future.then(result => {
    res.send(JSON.stringify(result));
  }).catch(error => {
    res.status(500).send("Data base: " + error);
  });
});


/**
 * @swagger
 * /posting:
 *   post:
 *     tags:
 *       - posting
 *     description: New posting (YYYY-MM-DD HH24:MI:SS)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: New Posting
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PostingAdd'
 *     responses:
 *       200:
 *         description: Successfully new posting
 *       500:
 *         description: Server error
 */
router.post("/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("create_posting", [req.body.price_day,
  req.body.start_date, req.body.end_date, req.body.state,
  req.body.features, req.body.public, req.body.content, req.body.id_user]);
  future.then(result => {
    res.send(JSON.stringify(result));
  }).catch(error => {
    res.status(500).send("Data base: " + error);
  });

});


/**
 * @swagger
 * /posting:
 *   put:
 *     tags:
 *       - posting
 *     description: New posting (YYYY-MM-DD HH24:MI:SS)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         description: New Posting
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/PostingPut'
 *     responses:
 *       200:
 *         description: Successfully update posting
 *       500:
 *         description: Server error
 */
router.put("/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("update_posting", [req.body.id_posting, req.body.price_day,
  req.body.start_date, req.body.end_date, req.body.state,
  req.body.features, req.body.public, req.body.content]);
  future.then(result => {
    res.send(JSON.stringify(result));
  }).catch(error => {
    res.status(500).send("Data base: " + error);
  });
});

/**
 * @swagger
 * /posting/{idPosting}:
 *   delete:
 *     tags:
 *       - posting
 *     description: delete posting 
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: path
 *         description: idposting
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully delete posting
 *       500:
 *         description: Server error
 */
router.delete("/posting/:idPosting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("delete_posting", [req.params.idPosting]);
  future.then(result => {
    res.send(JSON.stringify(result));
  }).catch(error => {
    res.status(500).send("Data base: " + error);
  });
});

module.exports = router;
