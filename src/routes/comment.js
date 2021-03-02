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
 * /comment/{idPosting}:
 *    get:
 *     tags:
 *       - comment
 *     description: get comment
 *     parameters:
 *       - name: idPosting
 *         in: path
 *         description: idposting
 *         required: true
 *         type: number
 *     security:
 *       - bearerAuth: []
 *     responses:
 *          '200':
 *           description:  OK
 */
router.get("/comment/:idPosting", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  try {
    const response = await dao.execSql("get_comments", [req.params.idPosting]);
    res.send({ message: response, status: 200, error: false });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: response});
  } catch (error) {
    res.status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
    logger.log({service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
  };
});

/**
 * @swagger
 * /comment/{idComment}:
 *   delete:
 *     tags:
 *       - comment
 *     description: delete comment
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idComment
 *         in: path
 *         description: idComment
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully delete comment
 *       500:
 *         description: Server error
 */
router.delete("/comment/:idComment", async (req, res) => {
  if (!validToken.validToken(req, res)) return;
  let tokenDecode = decodeToken.decodeToken(req);

  try {
    const comments = await dao.execSql("delete_comment", [req.params.idComment, tokenDecode.payload.id]);

    res.status(200).send({ message: comments, status: 200, error: false });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: comments});
  } catch (error) {
    res.status(500)
      .send({ message: "Imposible eliminar un comentario linkeado. Data base: " + error, status: 500, error: true });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
  }

});

/**
 * @swagger
 * /comment/{idPosting}:
 *    post:
 *     tags:
 *       - comment
 *     description: post comment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idPosting
 *         in: path
 *         description: idPosting
 *         required: true
 *         type: number
 *       - name: name
 *         description: New comment to posting
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CommentAdd'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully insert comment
 *       500:
 *         description: Server error
 */
router.post("/comment/:idPosting", async (req, res) => {  
  try {
    if (!validToken.validToken(req, res)) return;
    let tokenDecode = decodeToken.decodeToken(req);

    const comments = await dao.execSql("insert_comments", [req.params.idPosting ,tokenDecode.payload.id,
    req.body.content, true, req.body.linkedComment]);

    res.status(200).send({ message: comments, status: 200, error: false });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: comments});
  } catch (error) {
    res
      .status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
  };
});

module.exports = router;