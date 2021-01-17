const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());
const dao = require("../db/index");
var validToken = require("./tokenController.js");
var decodeToken = require("./tokenController.js");

const { logger } = require("../config/logger.js");

/**
 * @swagger
 * /ratingPosting/{idPosting}:
 *   post:
 *     tags:
 *       - rating
 *     description: Insert  
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
 *         description: Rating Posting
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RatingAdd'
 *     responses:
 *       200:
 *         description: Successfully rating a posting
 *       500:
 *         description: Server error
 */
router.post("/ratingPosting/:idPosting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);

  try {
    const infoRating = await dao.execSql("rating_posting", [tokenDecode.payload.id, req.params.idPosting, req.body.score, req.body.content]);

    res.status(200).send({ message: infoRating[0], status: 200, error: false });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: infoRating[0] });
  } catch (error) {
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
    res
      .status(500)
      .send({ message: "Posting rating failed: " + error, status: 500, error: true });
  };
});


/**
 * @swagger
 * /ratingBooker/{idUser}:
 *   post:
 *     tags:
 *       - rating
 *     description: Insert  
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idUser
 *         in: path
 *         description: idUser
 *         required: true
 *         type: number
 *       - name: body
 *         description: Rating Booker
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/RatingAdd'
 *     responses:
 *       200:
 *         description: Successfully rating a booker
 *       500:
 *         description: Server error
 */
router.post("/ratingBooker/:idUser", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);

  try {
    const infoRating = await dao.execSql("rating_booker", [tokenDecode.payload.id, req.params.idUser, req.body.score, req.body.content]);

    res.status(200).send({ message: infoRating[0], status: 200, error: false });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: infoRating[0] });
  } catch (error) {
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
    res
      .status(500)
      .send({ message: "User rating failed: " + error, status: 500, error: true });
  };
});

module.exports = router;