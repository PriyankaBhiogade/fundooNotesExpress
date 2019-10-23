const notesService = require('../service/notesService');
let cacheingService = require('../service/cacheingService');

/**
 * Purpose      :   Controller is derived from routes, and is attached to an instance of the services.
 * @file        :   notesControllers.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   28-09-2019
 **/

class NotesController {
    constructor() { }
    /**
   * @description :createNotes controller.
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    createNotes(req, res, next) {
        try {
            req.checkBody('title').notEmpty({ message: 'Title is required' })
            const error = req.validationErrors();
            let response = {
                success: false,
                status: 422,
                message: "Invalid Input",
                data: { error }
            }
            if (error) {
                return res.status(422).send(response);
            }
            else {
                const filterRequest = {
                    "userId": req.decoded.response.userId,
                    "title": req.body.title,
                    "description": req.body.description
                }
                notesService.createNotes(filterRequest).then((data) => {
                    res.status(200).send(data);
                }).catch((err) => {
                    res.status(400).send(err)
                });
            }
        }
        catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }

    /**
   * @description :getAllNotes controller .
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    getAllNotes(req, res, next) {
        try {
            
            const filterRequest = {
                "userId": req.decoded.response.userId
            }
            console.log("getallnotes",req.decoded.response.userId)
            notesService.getAllNotes(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err);
            })
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
    /**
     * @description :updateNotes controller .
     * @param :  req
     * @param :  res
     * @returns : res.send(result)
     */
    updateNotes(req, res, next) {
        try {
            req.checkBody('noteId')
                .notEmpty({ message: 'noteId is required' })

            req.checkBody('title')
                .notEmpty({ message: 'title is required' })

            const errors = req.validationErrors();
            let response = {
                success: false,
                status: 422,
                message: "Invalid Input",
                data: { errors }
            }
            if (errors) {
                return res.status(422).send(response);
            }
            else {
                const filterRequest = {
                    'userId': req.decoded.response.userId,
                    'id': req.body.noteId,
                    'title': req.body.title,
                    'description': req.body.description
                }
                notesService.updateNotes(filterRequest).then((data) => {
                    res.status(200).send(data);
                }).catch((err) => {
                    res.status(400).send(err);
                })

            }
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
    /**
 * @description :deleteNotes controller .
 * @param :  req
 * @param :  res
 * @returns : res.send(result)
 */
    deleteNotes(req, res, next) {
        try {
            if (typeof req.body.noteId === 'undefined') {
                next(new Error('ID is missing'));
            }
            const filterRequest = {
                'userId': req.decoded.response.userId,
                'id': req.body.noteId
            }
            notesService.deleteNotes(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err);
            })

        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
    /**
    * @description :trash controller .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */

    isTrash(req, res, next) {
        try {
            if (typeof req.body.noteId === 'undefined') {
                next(new Error('ID is missing'));
            }
            if (typeof req.body.isTrash === 'undefined') {

                next(new Error('isTrash is undefined'));
            }
            console.log("isTrash",req.decoded.response.userId)
            const filterRequest = {
                'userId': req.decoded.response.userId,
                'id': req.body.noteId,
                'isTrash': req.body.isTrash
            }
            if (filterRequest.id == null && filterRequest.isTrash == null) {
                next(new Error("Id and isTrash is not null"));
            } else {
                notesService.isTrash(filterRequest).then((data) => {
                    console.log("data",data);
                    
                    res.status(200).send(data);
                }).catch((err) => {
                    res.status(400).send(err)
                })
            }
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
    /**
    * @description :isArchive controller .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    isArchive(req, res, next) {
        try {
            if (typeof req.body.noteId === 'undefined') {
                next(new Error('ID is missing'));
            }
            if (typeof req.body.isArchive === 'undefined') {

                next(new Error('isArchive is undefined'));
            }
            const filterRequest = {
                'userId': req.decoded.response.userId,
                'id': req.body.noteId,
                'isArchive': req.body.isArchive
            }
            if (filterRequest.id == null && filterRequest.isArchive == null) {
                next(new Error("Id and isArchive is not null"));
            } else {
                notesService.isArchive(filterRequest).then((data) => {
                    res.status(200).send(data);
                }).catch((err) => {
                    res.status(400).send(err)
                })
            }
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }

    /**
      * @description :reminder controller .
      * @param :  req
      * @param :  res
      * @returns : res.send(result)
      */
    reminder(req, res, next) {
        try {
            // if (typeof req.body.noteId === 'undefined') {
            //     next(new Error('ID is missing'));
            // }
            // if (typeof req.body.reminder === 'undefined') {
            //     next(new Error('Reminder is undefined'));
            // }
            const filterRequest = {
                'userId': req.decoded.response.userId,
                'id': req.body.noteId,
                'reminder': req.body.reminder
            }
            if (filterRequest.id == null && filterRequest.reminder == null) {
                next(new Error("Id and reminder is not null"));
            } else {
                notesService.reminder(filterRequest).then((data) => {
                    res.status(200).send(data);
                }).catch((err) => {
                    res.status(400).send(err)
                })
            }
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }

    /**
      * @description :color controller .
      * @param :  req
      * @param :  res
      * @returns : res.send(result)
      */
    color(req, res, next) {
        try {
            if (typeof req.body.noteId === 'undefined') {
                next(new Error('ID is missing'));
            }
            if (typeof req.body.color === 'undefined') {

                next(new Error('Color is undefined'));
            }
            const filterRequest = {
                'userId': req.decoded.response.userId,
                'id': req.body.noteId,
                'color': req.body.color
            }
            console.log("red", filterRequest);

            // if (req.body.noteId != null && req.body.color != null) {
            //     next(new Error("Id and color is not null"));
            // } else {
            notesService.color(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err)
            })
            // }
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }

    /**
      * @description :search controller .
      * @param :  req
      * @param :  res
      * @returns : res.send(result)
      */

    search(req, res, next) {
        try {
            const filterRequest = {
                'userId': req.decoded.response.userId,
                'search': req.body.search
            }
            notesService.search(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err)
            })
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
    /**
     * @description :addLabel controller .
     * @param :  req
     * @param :  res
     * @returns : res.send(result)
     */
    addLabel(req, res, next) {
        try {
            if (typeof req.body.labelId === 'undefined') {
                next(new Error('labelId is undefined'));
            }
            const filterRequest = {
                "userId":req.decoded.response.userId,
                "noteId": req.body.noteId,
                "labelId": req.body.labelId,
            }
            console.log("in contro", filterRequest);

            notesService.addLabel(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err)
            });
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
    /**
   * @description :deleteLabel controller .
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    deleteLabel(req, res, next) {
        try {
            if (typeof req.body.labelId === 'undefined') {
                next(new Error('labelId is undefined'));
            }
            const filterRequest = {
                "userId": req.decoded.response.userId,
                "noteId": req.body.noteId,
                "labelId": req.body.labelId,
            }
            console.log("in contro", filterRequest);

            notesService.deleteLabel(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err)
            });
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }

    /**
   * @description :getAllReminderNotes controller .
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    getAllReminderNotes(req, res, next) {
        console.log("getAllReminderNotes",req.decoded.response.userId)


        try {
            const filterRequest = {
                "userId": req.decoded.userId
            }
            console.log("userId", filterRequest);

            notesService.getAllReminderNotes(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err);
            })
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }

    /**
     * @description :getAllIsTrashNotes controller .
     * @param :  req
     * @param :  res
     * @returns : res.send(result)
     */
    getAllIsTrashNotes(req, res, next) {
        try {
            console.log("getAllIsTrashNotes",req.decoded.response.userId)

            const filterRequest = {
                "userId": req.decoded.response.userId
            }
            notesService.getAllIsTrashNotes(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err);
            })
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }

    /**
     * @description :getAllIsArchiveNotes controller .
     * @param :  req
     * @param :  res
     * @returns : res.send(result)
     */
    getAllIsArchiveNotes(req, res, next) {
        try {
            console.log("getAllIsArchiveNotes",req.decoded.response.userId)

            const filterRequest = {
                "userId": req.decoded.response.userId
            }
            notesService.getAllIsArchiveNotes(filterRequest).then((data) => {
                console.log("constro",data)
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err);
            })
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
    /**
     * @description :getAllIsArchiveNotes controller .
     * @param :  req
     * @param :  res
     * @returns : res.send(result)
     */
    getAllLabelNotes(req, res, next) {
        try {
            console.log("getAllLabelNotes",req.decoded.response.userId)

            const filterRequest = {
                "userId": req.decoded.response.userId
            }
            notesService.getAllLabelNotes(filterRequest).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(400).send(err);
            })
        } catch (e) {
            console.error('Error: ', e);
            if (e instanceof AssertionError
                || e instanceof RangeError
                || e instanceof ReferenceError
                || e instanceof SyntaxError
                || e instanceof SystemError
                || e instanceof TypeError) {
                next('Something bad happened!');
            } else {
                next(e.message);
            }
        }
    }
}
module.exports = new NotesController();