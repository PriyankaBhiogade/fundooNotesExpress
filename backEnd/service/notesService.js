const notesModel = require('../app/models/notesModel');
var dateFormat = require('dateformat');
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
    async createNotes(req, next) {
        try {
            console.log("datsds", req);

            const result = await notesModel.createNotes(req)
            console.log('result', result);

            return result;
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @description : getAllNotes service.
     * @param :  req
     * @returns : data
     */
    async getAllNotes(req, next) {
        try {
            let field = { isTrash: false, isArchive: false }
            console.log("req", req);

            return await notesModel.getAllNotes(field);
        } catch (err) {
            next(err);
        }
    }
    /**
     * @description : getAllNotesById service.
     * @param :  req
     * @returns : data
     */
    async updateNotes(req, next) {
        try {
            const id = {
                _id: req.id
            }
            const filterData = {
                title: req.title,
                description: req.description
            }
            return await notesModel.updateNotes(id, filterData);
        } catch (err) {
            next(err);
        }
    }
    /**
     * @description : deleteNotes service.
     * @param :  req
     * @returns : data
     */
    async deleteNotes(req, next) {
        try {
            return await notesModel.deleteNotes(req);
        } catch (err) {
            next(err);
        }
    }
    /**
     * @description : isTrash service.
     * @param :  req
     * @returns : updateData
     */
    async isTrash(req, next) {
        try {
            const id = { _id: req.id }
            const getData = await notesModel.getAllNotes(id);
            let requestData;
            if (getData.data[0].isTrash === false) {
                requestData = { isTrash: true }
            }
            else if (getData.data[0].isTrash === true) {
                requestData = { isTrash: false }
            }
            const updateData = await notesModel.updateNotes(id, requestData)
            return updateData;
        } catch (error) {
            next(error)
        }
    }
    /**
    * @description : isArchive service.
    * @param :  req
    * @returns : updateData
    */
    async isArchive(req, next) {
        try {
            const id = { _id: req.id }
            const getData = await notesModel.getAllNotes(id);
            console.log("dataa", getData);

            let requestData;
            if (getData.data[0].isArchive === false) {
                requestData = { isArchive: true }
            }
            else if (getData.data[0].isArchive === true) {
                requestData = { isArchive: false }
            }
            console.log("requestData", requestData);
            console.log("id", id);

            const updateData = await notesModel.updateNotes(id, requestData)
            console.log("updateData", updateData);

            return updateData;
        } catch (error) {
            next(error)
        }
    }
    /**
    * @description : reminder service.
    * @param :  req
    * @returns : updateData 
    */
    async reminder(req, next) {
        try {
            const id = { _id: req.id }
            const filterData = {
                reminder: req.reminder,
            }
            const updateData = await notesModel.updateNotes(id, filterData)
            return updateData;
        } catch (error) {
            next(error)
        }
    }
    /**
    * @description : color service.
    * @param :  req
    * @returns : updateData
    */
    async color(req, next) {
        try {
            const id = { _id: req.id }
            const filterData = {
                color: req.color,
            }
            const updateData = await notesModel.updateNotes(id, filterData)
            return updateData;
        } catch (error) {
            next(error)
        }
    }
    /**
    * @description : search service.
    * @param :  req
    * @returns : updateData
    */
    async search(req, next) {
        try {
            console.log("aasa", req.search)
            const filterData = {
                search: req.search,
            }
            console.log("filterdata", filterData);
            const updateData = await notesModel.search(filterData)
            return updateData;
        } catch (error) {
            next(error)
        }
    }
    /**
     * @description : search service.
     * @param :  req
     * @returns : updateData
     */
    addLabel(req, next) {
        try {
            console.log("in ser", req)
            const id = { _id: req.noteId }
            let filterData = { $push: { label: req.labelId } }
            console.log("inservvvvv", filterData);

            return notesModel.updateNotes(id, filterData);
        }
        catch (err) {
            next(err);
        }
    }

    /**
    * @description : deleteLabel service.
    * @param :  req
    * @returns : updateData
    */
    deleteLabel(req, next) {
        try {
            const id = { _id: req.noteId }
            let filterData = { $pull: { label: req.labelId } }
            return notesModel.updateNotes(id, filterData);
        }
        catch (err) {
            next(err);
        }
    }
    /**
    * @description : getAllReminderNotes service.
    * @param :  req
    * @returns : updateData
    */
    async getAllReminderNotes(req, next) {
        try {
            let field = { reminder: { $ne: null } }
            const result = await notesModel.getAllNotes(field);
            return result;
        } catch (err) {
            next(err);
        }
    }
    /**
   * @description : notificationService service.
   * @param :  req
   * @returns : updateData
   */
   async notificationService() {
        let field = { reminder: { $ne: null } }
       const result = await notesModel.getAllNotes(field);
       const finalArray = result.data
                const currentTime = new Date();
                const reminder1 = finalArray.map((data) =>{
                    // console.log("data",data.reminder);
                    const setTime = data.reminder
                    const time = Date.parse(currentTime);
                    console.log("dataaaaaaTime",time);
                    
                    const reminder = Date.parse(setTime);
                    console.log("reminder",reminder);

                    if (time > reminder - 1000 || time < reminder + 1000 ) {
                        console.log( "notset" )
                    }
                    else{
                        console.log('"setTime" ,result')
                    }
                    
                })
                
            

       
    }
    /**
    * @description : getAllIsTrashNotes service.
    * @param :  req
    * @returns : updateData
    */
    async getAllIsTrashNotes(req, next) {
        try {
            let field = { isTrash: true }
            return await notesModel.getAllNotes(field);
        } catch (err) {
            next(err);
        }
    }
    /**
    * @description : getAllIsArchiveNotes service.
    * @param :  req
    * @returns : updateData
    */
    async getAllIsArchiveNotes(req, next) {
        try {
            let field = { isArchive: true }
            return await notesModel.getAllNotes(field);
        } catch (err) {
            next(err);
        }
    }
    /**
    * @description : getAllLabelNotes service.
    * @param :  req
    * @returns : updateData
    */
    async getAllLabelNotes(req, next) {
        try {
            let field = { label: { $ne: [] } }
            return await notesModel.getAllNotes(field);
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new NotesService();





