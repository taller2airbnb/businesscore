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
    //solo puedo calificar al posting si lo reserve alguna vez
    const { i_book_posting } = (await dao.execSql("i_book_posting", [req.params.idPosting, tokenDecode.payload.id]))[0];
    if (!i_book_posting) {
      let messageError =
        "Only you can rate if you have ever booked this hotel/posting";
      res.status(400).send({ message: messageError, status: 400, error: true });
      logger.log({
        service: req.method + ": " + req.originalUrl,
        level: "error",
        message: messageError,
      });
      return;
    }

    //solo puedo calificar una vez al posting
    const { rate_hotel_only_once } = (
      await dao.execSql("rate_hotel_only_once", [
        req.params.idPosting,
        tokenDecode.payload.id,
      ])
    )[0];
    if (!rate_hotel_only_once) {
      let messageError = "Only you can rate hotel/posting only one";
      res.status(400).send({ message: messageError, status: 400, error: true });
      logger.log({
        service: req.method + ": " + req.originalUrl,
        level: "error",
        message: messageError,
      });
      return;
    }

    if (req.body.score < 0 || req.body.score > 5) {
      res
        .status(400)
        .send({
          message: "The score must be between 0 and 5",
          status: 400,
          error: true,
        });
      logger.log({
        service: req.method + ": " + req.originalUrl,
        level: "error",
        message: "The score must be between 0 and 5",
      });
      return;
    }

    const infoRating = await dao.execSql("rating_posting", [
      tokenDecode.payload.id,
      req.params.idPosting,
      req.body.score,
      req.body.content,
    ]);

    res.status(200).send({ message: infoRating[0], status: 200, error: false });
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "info",
      message: infoRating[0],
    });
  } catch (error) {
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "error",
      message: error.message,
    });
    res
      .status(500)
      .send({
        message: "Posting rating failed: " + error,
        status: 500,
        error: true,
      });
  }
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
  try {
    let tokenDecode = decodeToken.decodeToken(req);
    if (req.body.score < 0 || req.body.score > 5) {
      res
        .status(400)
        .send({
          message: "The score must be between 0 and 5",
          status: 400,
          error: true,
        });
      logger.log({
        service: req.method + ": " + req.originalUrl,
        level: "error",
        message: "The score must be between 0 and 5",
      });
      return;
    }


    //solo puedo calificar si el usuario me reservo
    const { visit_to_me } = (
      await dao.execSql("visit_to_me", [
        tokenDecode.payload.id,
        req.params.idUser
      ])
    )[0];
    if (!visit_to_me) {
      let messageError =
        "Only you can rate if you have ever booked this hotel/posting";
      res.status(400).send({ message: messageError, status: 400, error: true });
      logger.log({
        service: req.method + ": " + req.originalUrl,
        level: "error",
        message: messageError,
      });
      return;
    }

    //solo puedo calificar una vez al usuario
    const { rate_user_only_once } = (
      await dao.execSql("rate_user_only_once", [
        tokenDecode.payload.id,
        req.params.idUser
      ])
    )[0];
    if (!rate_user_only_once) {
      let messageError = "Only you can rate user only one";
      res.status(400).send({ message: messageError, status: 400, error: true });
      logger.log({
        service: req.method + ": " + req.originalUrl,
        level: "error",
        message: messageError,
      });
      return;
    }

    const infoRating = await dao.execSql("rating_booker", [
      tokenDecode.payload.id,
      req.params.idUser,
      req.body.score,
      req.body.content,
    ]);

    res.status(200).send({ message: infoRating[0], status: 200, error: false });
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "info",
      message: infoRating[0],
    });
  } catch (error) {
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "error",
      message: error.message,
    });
    res
      .status(500)
      .send({
        message: "User rating failed: " + error,
        status: 500,
        error: true,
      });
  }
});

/**
 * @swagger
 * /ratingAverage/user:
 *    get:
 *     tags:
 *       - rating
 *     description: get average rating posting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idUser
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/ratingAverage/user", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  try {
    let score_avg = (
      await dao.execSql("get_rating_average_user", [req.query.idUser])
    )[0];
    score_avg = score_avg ? parseFloat(score_avg.average_score_user) : 0;
    res.status(200).send({ message: score_avg, status: 200, error: false });
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "info",
      message: score_avg,
    });
  } catch (error) {
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "error",
      message: error.message,
    });
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
  }
});

/**
 * @swagger
 * /ratingAverage/posting:
 *    get:
 *     tags:
 *       - rating
 *     description: get average rating posting
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/ratingAverage/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  try {
    let score_avg = (
      await dao.execSql("get_rating_average_posting", [req.query.idPosting])
    )[0];
    score_avg = score_avg ? parseFloat(score_avg.average_score_posting) : 0;
    res.status(200).send({ message: score_avg, status: 200, error: false });
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "info",
      message: score_avg,
    });
  } catch (error) {
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "error",
      message: error.message,
    });
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
  }
});

/**
 * @swagger
 * /rating/user:
 *    get:
 *     tags:
 *       - rating
 *     description: get user ratings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idUser
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/rating/user", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  try {
    let get_ratings_user = await dao.execSql("get_ratings_user", [
      req.query.idUser,
    ]);
    res
      .status(200)
      .send({ message: get_ratings_user, status: 200, error: false });
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "info",
      message: get_ratings_user,
    });
  } catch (error) {
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "error",
      message: error.message,
    });
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
  }
});

/**
 * @swagger
 * /rating/posting:
 *    get:
 *     tags:
 *       - rating
 *     description: get posting ratings
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPosting
 *         in: query
 *         required: true
 *         type: number
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/rating/posting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  try {
    let get_ratings_posting = await dao.execSql("get_ratings_posting", [
      req.query.idPosting,
    ]);
    res
      .status(200)
      .send({ message: get_ratings_posting, status: 200, error: false });
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "info",
      message: get_ratings_posting,
    });
  } catch (error) {
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "error",
      message: error.message,
    });
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
  }
});

module.exports = router;
