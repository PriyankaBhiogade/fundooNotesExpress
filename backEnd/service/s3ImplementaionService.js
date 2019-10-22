const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

/**
 * Purpose      :   S3 Implementaion service for storing media file in s3 bucket.
 * @file        :   s3ImplementaionService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   27-9-2019
 **/

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

const multerS3Config = multer({
  storage: multerS3({
    s3: s3,
     bucket: process.env.bucket,
     acl: 'public-read',
    metadata: (req, file, cb) => {
      // console.log("file",file);
      cb(null,{ fieldName: file.originalname });
    },
    key: (req, file, cb) => {
      // console.log("data", file);
      cb(null, `img_${Date.now().toString()}.png`);
    }
  })
})

module.exports = multerS3Config;






















// class Multer {
//   constructor(){}
//  async upload() {   

//     const multerS3Config = multer({
//       storage: multerS3({
//         s3: s3,
//         bucket: 'fundoonotes123',
//         metadata:  (req, file, cb) => {
//           cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file, cb) {
//           cb(null, Date.now().toString()+".png")
//         }
//       })
//     }).single('image');
//     console.log( "in multer",multerS3Config)   
//      return multerS3Config;
//   }
// }
