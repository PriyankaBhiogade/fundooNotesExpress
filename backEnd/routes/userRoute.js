
const userContoller = require('../controllers/userController');
const notesController = require('../controllers/notesController');
const labelController = require('../controllers/labelsController');
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
    router.post('/isTrash', auth.checkToken, notesController.isTrash);
    router.post('/isArchive', auth.checkToken, notesController.isArchive);
    router.post('/reminder', auth.checkToken, notesController.reminder);
    router.post('/color', auth.checkToken, notesController.color);
    router.post('/search', auth.checkToken, notesController.search);
    router.post('/addLabel', auth.checkToken, notesController.addLabel);
    router.post('/deleteLabel', auth.checkToken, notesController.deleteLabel);
    router.post('/getAllReminderNotes', auth.checkToken, notesController.getAllReminderNotes);
    router.post('/getAllIsTrashNotes', auth.checkToken, notesController.getAllIsTrashNotes);
    router.post('/getAllIsArchiveNotes', auth.checkToken, notesController.getAllIsArchiveNotes);
    router.post('/getAllLabelNotes', auth.checkToken, notesController.getAllLabelNotes);


    /**
    * @description :Label routes
    */
    router.post('/createLabel', auth.checkToken, labelController.createLabel);
    router.get('/getAllLabel', auth.checkToken, labelController.getAllLabel);
    router.post('/updateLabel', auth.checkToken, labelController.updateLabel);
    router.post('/deleteLabel', auth.checkToken, labelController.deleteLabel);


}
catch (err) {
    throw (err);
}
module.exports = router;







