const { Router } = require("express");
const { Buffer } = require("buffer");
const stream = require('stream');

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
 *     consumes: 
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: file
 *         description: File to store
 *         in: formData
 *         type: string
 *         required: true
 *         format: base64
 *       - name: idPosting
 *         description: idposting
 *         in: path
 *         required: true
 *         type: number
 *       - name: metaContentType
 *         description: content type metadata
 *         in: query
 *         required: false
 *         type: string
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
    message: "File upload to post: " + req.params.idPosting,
  });

  let newFileName;
  const fileContents = new Buffer(req.body.file, 'base64');

  try {
    const imagePosting = await dao.execSql("insert_image_posting", [req.params.idPosting]);
    newFileName = `${imagePosting[0].id_image_posting}`;

    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: 'Success insert image_posting' });
  } catch (error) {
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
    res
      .status(500)
      .send({ message: "Insert file failed: " + error, status: 500, error: true });
  };

  let bufferStream = new stream.PassThrough();
  bufferStream.end(fileContents);
  
  let file = bucket.file(newFileName);
  const config = {
    action: 'read',
    expires: '01-01-2050'
  };

  var resDownloadUrl;
  file.getSignedUrl(config).then(function(result){
      resDownloadUrl = result[0];
  });

  bufferStream.pipe(file.createWriteStream({
      metadata: {
        contentType: req.query.metaContentType // 'image/jpeg', 'video/mp4'
      }
  }))
  .on('error', error => {
    res.status(500).send({ 
          message: error, status: 500, error: true });
  })
  . on('finish', (file) => {
    res.status(200).send({
          message: "Success file upload",
          status: 200,
          error: false,
          downloadURL: resDownloadUrl
        });
  });

});

module.exports = router;