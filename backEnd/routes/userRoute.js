
const userContoller = require('../controllers/userController');
const notesController = require('../controllers/notesController');
const auth = require('../service/tokenVerifyService');
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
/**
* @description :User routes
*/
try {
    router.post('/register', userContoller.registerUser);
    router.post('/login', userContoller.loginUser);
    router.post('/forgotPassword', userContoller.forgotPassword);
    router.post('/reset', auth.checkToken, userContoller.resetPassword);
    router.post('/upload', userContoller.upload);

    /**
    * @description :Notes routes
    */
    router.post('/createNotes', auth.checkToken, notesController.createNotes);
    router.get('/getAllNotes', auth.checkToken, notesController.getAllNotes);
    router.post('/updateNotes', auth.checkToken, notesController.updateNotes);
    router.post('/deleteNotes', auth.checkToken, notesController.deleteNotes);



}
catch (err) {
    throw (err);
}
module.exports = router;







