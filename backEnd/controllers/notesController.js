const notesService = require('../service/notesService');
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
   * @description :createNotes controller .
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    async createNotes(req, res, next) {
        try {
            const filterRequest = {
                "userId": req.decoded.userId,
                "title": req.body.title,
                "description": req.body.description
            }
            console.log("userid", filterRequest.userId);

            await notesService.createNotes(filterRequest).then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err)
            });
        } catch (err) {
            next(err);
        }
    }

    /**
   * @description :getAllNotes controller .
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    async getAllNotes(req, res, next) {
        try {
            const filterRequest = {
                "userId": req.decoded.userId
            }
            await notesService.getAllNotes(filterRequest).then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err);
            })

        } catch (err) {
            next(err)
        }
    }
    /**
     * @description :updateNotes controller .
     * @param :  req
     * @param :  res
     * @returns : res.send(result)
     */
    async updateNotes(req, res, next) {
        try {
            const filterRequest = {
                'userId': req.decoded.userId,
                'id': req.body.id,
                'title': req.body.title,
                'description': req.body.description
            }

            await notesService.updateNotes(filterRequest).then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err);
            })

        } catch (err) {
            next(err)
        }
    }
    /**
 * @description :deleteNotes controller .
 * @param :  req
 * @param :  res
 * @returns : res.send(result)
 */
    async deleteNotes(req, res, next) {
        try {
            const filterRequest = {
                'userId': req.decoded.userId,
                'id': req.body.id
            }

            await notesService.deleteNotes(filterRequest).then((data) => {
                res.send(data);
            }).catch((err) => {
                res.send(err);
            })

        } catch (err) {
            next(err)
        }
    }

}
module.exports = new NotesController();