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
    async createNotes(req, next) {
        try {
            const result = await notesModel.createNotes(req)
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
            return await notesModel.getAllNotes(req,field);
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
            const getData = await notesModel.getAllNotes(req,id);
            let requestData;
            if (getData.data[0].isTrash === false) {
                requestData = { isTrash: true }
            }
            else if (getData.data[0].isTrash === true) {
                requestData = { isTrash: false }
            }     
          const updateData= await notesModel.updateNotes(req,id,requestData)
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
            const getData = await notesModel.getAllNotes(req,id);
            let requestData;
            if (getData.data[0].isArchive === false) {
                requestData = { isArchive: true }
            }
            else if (getData.data[0].isArchive === true) {
                requestData = { isArchive: false }
            }
            const updateData = await notesModel.updateNotes(req,id, requestData)
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
            const updateData = await notesModel.updateNotes(req,id, filterData)
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
            const updateData = await notesModel.updateNotes(req,id, filterData)
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
            const filterData = {
                search: req.search,
            }
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
            const id = { _id: req.noteId }
            let filterData = { $push: { label: req.labelId } }
            return notesModel.updateNotes(req,id,filterData);
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
            return notesModel.updateNotes(req,id, filterData);
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
            const result = await notesModel.getAllNotes(req,field);
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
        const field = { reminder: { $ne: null } }
        const result = await notesModel.getAllNotes(field,field);
        const finalArray = result.data
        const currentTime = new Date();
        console.log("current time before parse", currentTime);
        finalArray.map((data) => {
            const setReminderTime = data.reminder
            const time = Date.parse(currentTime);
            console.log("Current time ==>", time);
            const reminder = Date.parse(setReminderTime);
            console.log("Set time reminder", reminder -1000);
            if (time > reminder - 1000 || time < reminder + 1000) {
                console.log("send notification");
            }
            else {
                console.log("not send");
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
            return await notesModel.getAllNotes(req,field);
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
            return await notesModel.getAllNotes(req,field);
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
            return await notesModel.getAllNotes(req,field);
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new NotesService();





