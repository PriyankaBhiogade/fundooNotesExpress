const mongoose = require('mongoose');
const schema = mongoose.Schema;
const redis = require('redis');
const client = redis.createClient();
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
        ref: "labels"
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

    findData(req, next) {
        try {
            const id = req.userId
            return new Promise((resolve, reject) => {
                notesModel.find({ userId: id }).populate('label').then((data) => {
                    resolve(data);
                }).catch((err) => {
                    reject({ 'success': true, 'status': 500, 'message': 'Internal Server Error ', 'Error': err })
                })
            })
        }
        catch (error) {
            next(error);
        }
    }
    createNotes(body, next) {
        try {
            return new Promise((resolve, reject) => {
                let newNotes = new notesModel({
                    'userId': body.userId,
                    'title': body.title,
                    'description': body.description,
                    'isTrash': body.isTrash,
                    'isArchive': body.isArchive,
                    'reminder': body.reminder,
                    'color': body.color,
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
                    console.log("new data",data)
                    this.findData(body).then((findData) => {
                        console.log("findData data",findData)
                        client.set("notesData" + body.userId, JSON.stringify(findData), redis.print)
                    })
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
    getAllNotes(req, field, next) {
        try {
            console.log("modelreq",req)
            console.log("field",field)
            return new Promise((resolve, reject) => {
                let response = {
                    successs: false,
                    messege: "All Notes not display",
                    data: {}
                }
                let data = {
                    reminder: { reminder: { $ne: null } },
                    isArchive: { isArchive: true },
                    isTrash: { isTrash: true },
                    label: { label: { $ne: [] } },
                    getAllNotes: { isTrash: false, isArchive: false }

                }
                if (JSON.stringify(field) === JSON.stringify(data.getAllNotes)) {
                    client.get("notesData" + req.userId, (error, result) => {
                        console.log("redisDataaa", req.userId)
                        console.log("redisDataaa",result)
                        let redisData = JSON.parse(result);
                        if (redisData != null) {
                            const data1 = redisData.filter((data) => {
                                if (data.isArchive == false && data.isTrash == false) {
                                    return data
                                }
                            })
                            response.successs = true,
                                response.messege = "All Notes display Sucessfully from redis",
                                response.data = data1
                                console.log("dfgdg",data1)
                            resolve(response);
                        }
                        else {
                            notesModel.find(field).populate('label').then((data) => {
                               
                                response.successs = true,
                                    response.messege = "All Notes display Sucessfully from DB",
                                    response.data = data
                                client.set("notesData" + req.userId, JSON.stringify(data), redis.print)
                                console.log("model",response)
                                resolve(response);
                            }).catch((err) => {
                                response.data = err
                                reject(response);
                            })
                        }
                    })
                }
                else {
                    notesModel.find(field).populate('label').then((data) => {
                        console.log("model",data)
                        response.successs = true,
                            response.messege = " Notes display Sucessfully from DB",
                            response.data = data
                        resolve(response);
                    }).catch((err) => {
                        response.data = err
                        reject(response);
                    })
                }
            })

        } catch (err) {
            next(err);
        }
    }

    // if (JSON.stringify(field) === JSON.stringify(data.isTrash)) {
    //     const data1 = redisData.filter((data) => {
    //         if (data.isTrash == true) {
    //             return data
    //         }
    //     })
    //     response.successs = true,
    //         response.messege = "All trash Notes display Sucessfully from redis",
    //         response.data = data1
    //     resolve(response);
    // }
    // else if (JSON.stringify(field) === JSON.stringify(data.isArchive)) {
    //     const data1 = redisData.filter((data) => {
    //         if (data.isArchive == true) {
    //             return data
    //         }
    //     })
    //     response.successs = true,
    //         response.messege = "All Archive Notes display Sucessfully from redis",
    //         response.data = data1
    //     resolve(response);
    // }
    // else if (JSON.stringify(field) === JSON.stringify(data.reminder)) {
    //     const data1 = redisData.filter((data) => {
    //         if (data.reminder !== null) {
    //             return data
    //         }
    //     })
    //     response.successs = true,
    //         response.messege = "All reminder Notes display Sucessfully from redis",
    //         response.data = data1
    //     resolve(response);
    // }

    // else if (JSON.stringify(field) === JSON.stringify(data.label)) {
    //     const data1 = redisData.filter((data) => {
    //         if (data.label.length !== 0) {
    //             return data
    //         }

    //     })
    //     response.successs = true,
    //         response.messege = "All label Notes display Sucessfully from redis",
    //         response.data = data1
    //     resolve(response);
    // }
    // else if (JSON.stringify(field) === JSON.stringify(data.getAllNotes)) {

    //     const data1 = redisData.filter((data) => {
    //         if (data.isArchive == false && data.isTrash == false) {
    //             return data
    //         }
    //     })
    //     response.successs = true,
    //         response.messege = "All Notes display Sucessfully from redis",
    //         response.data = data1
    //     resolve(response);
    // }
    // else {
    //     console.log("invalid Data")
    //         // }
    //     }

    // }
    //     else {
    //         notesModel.find().populate('label').then((data) => {
    //             response.successs = true,
    //                 response.messege = "All Notes display Sucessfully from DB",
    //                 response.data = data
    //             console.log('fetching data from api-----');
    //             client.set("notesData" + req.userId, JSON.stringify(data), redis.print)
    //             console.log("GET all notes ---->", data);
    //             resolve(response);
    //         })
    //     }

    // })

    // }).catch ((err) => {
    //     response.data = err
    //     reject(response);
    // })
    //     } catch(err) {
    //         next(err);
    //     }
    // }

    /**
    * @description : updateNotes is a function for update notes by id ..
    * @param : request
    * @returns : promise
    */
    updateNotes(req, id, filterData, next) {
        try {
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
                        this.findData(req).then((findData) => {
                            client.set("notesData" + req.userId, JSON.stringify(findData), redis.print)
                        })
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

                    this.findData(body).then((findData) => {
                        client.set("notesData" + body.userId, JSON.stringify(findData), redis.print)
                    })
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