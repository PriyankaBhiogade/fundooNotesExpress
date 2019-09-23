
const contoller = require('../controllers/userController');
const token = require('../utility/utility');
const express = require('express');

/**
 * Purpose      :   Route is derived from one of the HTTP methods, and is attached to an 
                    instance of the express class.
 * @file        :   userRoutes.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/

const router = express.Router();
router.post('/register', contoller.registerUser);
router.post('/login',contoller.loginUser);
router.post('/reset',token.checkToken,contoller.resetPassword);
module.exports = router;







