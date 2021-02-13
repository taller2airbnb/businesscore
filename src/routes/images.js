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
 * /upload/{idPosting}:
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
*       - name: idPosting
 *         in: path
 *         description: idposting
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully image upload
 *       500:
 *         description: Server error
 */
router.post('/upload/:idPosting', multer.single('file'), async (req, res) => {
  // if (!validToken.validToken(req, res)) return;
  // let tokenDecode = decodeToken.decodeToken(req);

  logger.log({
    service: req.method + ": " + req.originalUrl,
    level: "info",
    message: "Image upload: " + req.file.originalname,
  });

  let newFileName;

  try {
    const imagePosting = await dao.execSql("insert_image_posting", [req.params.idPosting]);
    newFileName = `${imagePosting[0].id_image_posting}`;

    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: 'Success insert image posting' });
  } catch (error) {
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
    res
      .status(500)
      .send({ message: "Insert image failed: " + error, status: 500, error: true });
  };

  let file = req.file;
  let fileUpload = bucket.file(newFileName);

  if (file) {
    const options = {
      destination: newFileName,
      validation: 'crc32c',
      contentType: file.mimetype
    };

    bucket.upload("/Users/ccordoba/Documents/" + file.originalname, options, async function(error, fileUpload) {
      if (!error) {
        
        res.status(200).send({
          message: "Success image upload: " + fileUpload.metadata.name,
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

module.exports = router;