const mongoose = require('mongoose');
const schema = mongoose.Schema;
/**
 * Purpose      :   Notesmodel is derived from services, and deaclared all schema to stord data into database 
                    and return promise to services.
 * @file        :   notesModels.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   28-9-2019
 **/

/** 
 * @discription : Create notes schema in database
 */
const notesSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User Id is requred']
    },
    title: {
        type: String,
        required: [true, 'Title is requred']
    },
    description: {
        type: String
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    reminder: {
        type: Date,
        default: null
    },
    color: {
        type: String
    },
    label: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'labels'
    }]
},
    {
        timestamps: true
    });
const notesModel = mongoose.model('notes', notesSchema);
class NotesModel {
    constructor() { }
    /**
     * @description : createNotes is a function for creating new note and stored data into database using save() method ..
     * @param : request
     * @returns : promise
     */
    createNotes(body, next) {
        try {
            return new Promise((resolve, reject) => {
                let newNotes = new notesModel({
                    'title': body.title,
                    'description': body.description,
                    'isTrash': body.isTrash,
                    'isArchive': body.isArchive,
                    'reminder': body.reminder,
                    'color': body.color,
                    'userId': body.userId,
                    'labelId': body.labelId
                })
                let response = {
                    successs: false,
                    status: 500,
                    messege: "Notes not created ",
                    data: {}
                }
                newNotes.save().then((data) => {
                    response.successs = true,
                        response.status = 200,
                        response.messege = "Notes created Sucessfully",
                        response.data = data
                    resolve(response);
                }).catch((error) => {
                    response.data = error
                    reject(response);
                })
            })
        }
        catch (error) {
            next(error);
        }
    }

    /**
   * @description : getAllNotes is a function to get all notes ..
   * @returns : promise
   */
    getAllNotes(body, field, next) {
        try {
            return new Promise((resolve, reject) => {
                let response = {
                    successs: false,
                    status: 500,
                    messege: "All Notes not display",
                    data: {}
                }
                notesModel.find(field).populate('label')
                    .then((data) => {
                        response.successs = true,
                            response.status = 200,
                            response.messege = "All Notes display Sucessfully",
                            response.data = data
                        resolve(response);
                    }).catch((err) => {
                        response.data = err
                        reject(response);
                    })
            })

        } catch (err) {
            next(err);
        }
    }

    /**
   * @description : updateNotes is a function for update notes by id ..
   * @param : request
   * @returns : promise
   */
    updateNotes(id, filterData, next) {
        try {
            console.log(" model ----%%%%%", id, filterData);

            return new Promise((resolve, reject) => {
                let response = {
                    successs: false,
                    status: 500,
                    messege: "Note not update ",
                    data: {}
                }
                notesModel.updateOne(id, filterData)
                    .then((data) => {
                        response.successs = true,
                            response.status = 200,
                            response.messege = `Note update Sucessfully`,
                            response.data = data
                        resolve(response);
                    }).catch((err) => {
                        response.data = err
                        reject(response);
                    })
            })
        } catch (err) {
            throw (err);
        }
    }
    /**
   * @description : deleteNotes is a function for delete the notes by id ..
   * @param : request
   * @returns : promise
   */
    deleteNotes(body, next) {
        try {
            return new Promise((resolve, reject) => {
                let response = {
                    successs: false,
                    status: 500,
                    messege: `Notes not deleted`,
                    data: {}
                }
                notesModel.deleteOne({ _id: body.id }).then((data) => {
                    response.successs = true,
                        response.status = 200,
                        response.messege = `Note deleted Sucessfully`,
                        response.data = data

                    resolve(response);
                }).catch((err) => {
                    response.data = err
                    reject(response);
                })
            })

        } catch (err) {
            next(err);
        }
    }

    /**
    * @description : searchNotes is a function for search the notes by title,description,color,reminder ..
    * @param : request
    * @returns : promise
    */
    search(field, next) {
        try {
            return new Promise((resolve, reject) => {
                let response = {
                    successs: false,
                    status: 500,
                    messege: "All Notes not display",
                    data: {}
                }
                console.log("in model ", field.search);
                const data = field.search;
                // {reminder:  Date.parse(pattern).toString()}
                const pattern = new RegExp('.*' + field.search + '.*', "i");
                notesModel.find({ $or: [{ title: pattern }, { description: pattern }, { color: pattern },] }).then((data) => {
                    response.successs = true,
                        response.status = 200,
                        response.messege = "All Notes display Sucessfully",
                        response.data = data
                    resolve(response);
                }).catch((err) => {
                    response.data = err
                    reject(response);
                })
            })
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new NotesModel();