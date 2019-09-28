
const contoller = require('../controllers/userController');
const token = require('../service/tokenVerifyService');
const express = require('express');

/**
 * Purpose      :   Route is derived from one of the HTTP methods, and is attached to an 
                    instance of the express class.
 * @file        :   userRoutes.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/
// const upload = imageUplaod.single('image');
const router = express.Router();
router.post('/register', contoller.registerUser);
router.post('/login',contoller.loginUser);
router.post('/forgotPassword',contoller.forgotPassword);
router.post('/reset',token.checkToken,contoller.resetPassword);
router.post('/upload',contoller.upload);

module.exports = router;







