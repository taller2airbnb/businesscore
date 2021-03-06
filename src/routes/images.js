const { Router } = require("express");
const { Buffer } = require("buffer");
const stream = require('stream');
const uuid = require('uuid-v4');

const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());
const dao = require("../db/index");

const { logger } = require("../config/logger.js");
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

/**
 * @swagger
 * /images/upload/{idPosting}:
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
 *         description: Posting
 *         in: path
 *         required: true
 *         type: number
 *       - name: metaContentType
 *         description: Content type metadata
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully image upload
 *       500:
 *         description: Server error
 */
router.post('/images/upload/:idPosting', multer.single('file'), async (req, res) => {
  // if (!validToken.validToken(req, res)) return;
  // let tokenDecode = decodeToken.decodeToken(req);

  const _private_key_id = process.env['firebase_private_key_id'];
  const _private_key = process.env['firebase_private_key'].replace(/\\n/g, '\n');

  const storage = new Storage({
    credentials: {
      "type": "service_account",
      "project_id": "bookbnb-degoas-ed",
      "private_key_id": _private_key_id,
      "private_key": _private_key,
      "client_email": "firebase-adminsdk-j0yl9@bookbnb-degoas-ed.iam.gserviceaccount.com",
      "client_id": "113541112032005868737",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j0yl9%40bookbnb-degoas-ed.iam.gserviceaccount.com"
    }
  });

  const bucket = storage.bucket("gs://bookbnb-degoas-ed.appspot.com");

  logger.log({
    service: req.method + ": " + req.originalUrl,
    level: "info",
    message: "File upload to post: " + req.params.idPosting,
  });

  let newFileName;
  let imagePosting;
  const fileContents = new Buffer(req.body.file, 'base64');

  try {
    imagePosting = await dao.execSql("insert_image_posting", [req.params.idPosting]);
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
            metadata: {
              // This line is very important. It's to create a download token.
              firebaseStorageDownloadTokens: uuid()
            },
        contentType: req.query.metaContentType // 'image/jpeg', 'video/mp4'
      }
  }))
  .on('error', error => {
    res.status(500).send({ 
          message: error, status: 500, error: true });
  })
  .on('finish', async (file) => {
    try {
      const id_image = imagePosting[0].id_image_posting;
      await dao.execSql("update_img_post", [id_image, resDownloadUrl]); 
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: 'Success update image_posting' });
      res.status(200).send({
        message: "Success file upload",
        status: 200,
        error: false,
        downloadURL: resDownloadUrl
      });
    } catch (error) {
      logger.log({ service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
      res.status(500).send({ message: "Update image_posting failed: " + error, status: 500, error: true });
    };
  });

});

/**
 * @swagger
 * /images/{idPosting}:
 *    get:
 *     tags:
 *       - images
 *     description: get images
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
router.get("/images/:idPosting", async (req, res) => {
  //if (!validToken.validToken(req, res)) return;

  try {
    const response = await dao.execSql("get_images", [req.params.idPosting]);
    res.send({ message: response, status: 200, error: false });
    logger.log({ service: req.method + ": " + req.originalUrl, level: 'info', message: response});
  } catch (error) {
    res.status(500)
      .send({ message: "Data base: " + error, status: 500, error: true });
    logger.log({service: req.method + ": " + req.originalUrl, level: 'error', message: error.message });
  };
});


module.exports = router;