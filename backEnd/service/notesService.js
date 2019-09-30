const notesModel = require('../app/models/notesModel');

/**
 * Purpose      :   Sevices is derived from controller, and is attached to an 
                    instance of the models.
 * @file        :   notesService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   28-09-2019
 **/
class NotesService {
    constructor() { }
    /**
     * @description :createNotes service.
     * @param :  req
     * @returns : data
     */
    createNotes(req, next) {
        try {
            return notesModel.createNotes(req);
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @description :getAllNotes service.
     * @param :  req
     * @returns : data
     */
   async getAllNotes(req,next) {
        try{
            return await notesModel.getAllNotes(req);
        } catch(err){
            next(err);
        }
    }
    /**
     * @description :getAllNotesById service.
     * @param :  req
     * @returns : data
     */
    async updateNotes(req,next) {
        try{
            return await notesModel.updateNotes(req);
        } catch(err){
            next(err);
        }
    }
    /**
     * @description :deleteNotes service.
     * @param :  req
     * @returns : data
     */
    async deleteNotes(req , next){
        try{
            return await notesModel.deleteNotes(req);
        } catch(err){
            next(err);
        }
    }
}


module.exports = new NotesService();