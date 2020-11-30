const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options('*', cors());
const dao = require("../db/index");
var validToken = require('./tokenController.js');
var decodeToken = require('./tokenController.js');

/**
 * @swagger
 * /posting:
 *    get:
 *     tags:
 *       - posting
 *     description: get posting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("get_posting", [req.query.idPosting]);
  future.then(result => {
    res.status(200).send({ "message": result, "status": 200, "error": false });
  }).catch(error => {
    res.status(500).send({ "message": "Data base: " + error, "status": 500, "error": true });
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
  let tokenDecode = decodeToken.decodeToken(req);
  const future = dao.execSql("create_posting", [req.body.price_day,
  req.body.start_date, req.body.end_date, req.body.state,
  req.body.features, req.body.public, req.body.content, tokenDecode.payload.id]);
  future.then(result => {
    res.status(200).send({ "message": result, "status": 200, "error": false });
  }).catch(error => {
    res.status(500).send({ "message": "Data base: " + error, "status": 500, "error": true });
  });

});


/**
 * @swagger
 * /posting/{idPosting}:
 *   put:
 *     tags:
 *       - posting
 *     description: New posting (YYYY-MM-DD HH24:MI:SS)
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
 *       - name: body
 *         description: Update Posting
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
router.put("/posting/:idPosting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("update_posting", [req.params.idPosting, req.body.price_day,
  req.body.start_date, req.body.end_date, req.body.state,
  req.body.features, req.body.public, req.body.content]);
  future.then(result => {
    res.status(200).send({ "message": result, "status": 200, "error": false });
  }).catch(error => {
    res.status(500).send({ "message": "Data base: " + error, "status": 500, "error": true });
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
    res.status(200).send({ "message": result, "status": 200, "error": false });
  }).catch(error => {
    res.status(500).send({ "message": "Data base: " + error, "status": 500, "error": true });
  });
});


/**
 * @swagger
 * /posting/search:
 *    get:
 *     tags:
 *       - posting
 *     description: get posting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: priceMin
 *         in: query
 *         required: false
 *         type: number
 *       - name: priceMax
 *         in: query
 *         required: false
 *         type: number
 *       - name: startDate
 *         in: query
 *         required: false
 *         type: string
 *         description: YYYY-MM-DD HH24:MI:SS
 *       - name: endDate
 *         in: query
 *         required: false
 *         type: string
 *         description: YYYY-MM-DD HH24:MI:SS
 *       - name: feature
 *         in: query
 *         required: false
 *         type: string
 *         description: '{id wifi, id tv, id baño}'
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/posting/search", async (req, res) => {
  // if (!validToken.validToken(req, res)) return;
  const future = dao.execSql("search_posting", [req.query.priceMin,
  req.query.priceMax, req.query.startDate, req.query.endDate, req.query.feature]);
  future.then(result => {
    res.send({ "message": result, "status": 200, "error": false });
  }).catch(error => {
    res.status(500).send({ "message": "Data base: " + error, "status": 500, "error": true });
  });
});

module.exports = router;
