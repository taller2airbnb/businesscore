const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());
const dao = require("../db/index");

const { logger } = require("../config/logger.js");
const {Storage} = require('@google-cloud/storage');

const Multer = require('multer');

const storage = new Storage({
  credentials: require('../config/bookbnb-degoas-ed-firebase-adminsdk-j0yl9-8fffe79fdf.json')
});

const bucket = storage.bucket("gs://bookbnb-degoas-ed.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

/**
 * @swagger
 * /upload:
 *   post:
 *     tags:
 *       - images
 *     description: Image upload
 *     produces:
 *       - application/json
 *     consumes:
 *       - multipart/form-data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: file
 *         description: Image to store
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Successfully image upload
 *       500:
 *         description: Server error
 */
router.post('/upload', multer.single('file'), async (req, res) => {
  // if (!validToken.validToken(req, res)) return;
  // let tokenDecode = decodeToken.decodeToken(req);

  logger.log({
    service: req.method + ": " + req.originalUrl,
    level: "info",
    message: "Image upload: " + req.file.originalname,
  });

  let file = req.file;

  if (file) {

    bucket.upload("/Users/ccordoba/Documents/" + file.originalname, function(error, file) {
      if (!error) {
        res.status(200).send({
          message: "Success image upload: " + file.metadata.name,
          status: 200,
          error: false
        });
      } else {
        res.status(500).send({ 
          message: error, status: 500, error: true 
        });
      }
    });
    
  }
});

/**
 * @swagger
 * /imagePosting/{idPosting}:
 *   post:
 *     tags:
 *       - images
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
 *         description: Image to Posting
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ImageAdd'
 *     responses:
 *       200:
 *         description: Successfully rating a posting
 *       500:
 *         description: Server error
 */
router.post("/imagePosting/:idPosting", async (req, res) => {
  // if (!validToken.validToken(req, res)) return;
  // let tokenDecode = decodeToken.decodeToken(req);

  try {
    const imagePosting = await dao.execSql("insert_image_posting", [req.params.idPosting, req.body.name]);

    res.status(200).send({ message: imagePosting[0], status: 200, error: false });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: 'Success insert image posting' });
  } catch (error) {
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
    res
      .status(500)
      .send({ message: "Insert image failed: " + error, status: 500, error: true });
  };
});

module.exports = router;