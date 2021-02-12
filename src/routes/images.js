const { Router } = require("express");
const router = Router();
var cors = require("cors");
router.use(cors());
router.options("*", cors());

const { logger } = require("../config/logger.js");
const {Storage} = require('@google-cloud/storage');

const Multer = require('multer');

const storage = new Storage({
  // credentials: require('../config/bookbnb-degoas-ed-53962d7eeb24.json')
});

const bucket = storage.bucket("/user-upload-images/");

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
router.post('/upload', multer.single('file'), (req, res) => {
    logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "info",
      message: "Image upload" + req.file.originalname,
    });

  let file = req.file;
  if (file) {
    uploadImageToStorage(file).then((success) => {
      res.status(200).send({
        status: 'success'
      });
    }).catch((error) => {
      logger.log({
      service: req.method + ": " + req.originalUrl,
      level: "error",
      message: error.message,
    });
    res
      .status(500)
      .send({ message: error, status: 500, error: true });
    });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${Date.now()}`;

    let fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      reject('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}

module.exports = router;