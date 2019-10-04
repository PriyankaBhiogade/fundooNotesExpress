const labelService = require('../service/labelsService');
/**
 * Purpose      :   Controller is derived from routes, and is attached to an instance of the services.
 * @file        :   labelControllers.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   04-10-2019
 **/

class LabelController {
    constructor() { }
    /**
   * @description :createLabel controller.
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    createLabel(req, res, next) {
        try {
            if (typeof req.body.labelName === 'undefined') {
                next(new Error('labelName is undefined'));
            }
            const filterRequest = {
                "userId": req.decoded.userId,
                "labelName": req.body.labelName,
            }
            console.log("in contro",filterRequest);
            
            labelService.createLabel(filterRequest).then((data) => {
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
   * @description :getAllLabel controller .
   * @param :  req
   * @param :  res
   * @returns : res.send(result)
   */
    getAllLabel(req, res, next) {
        try {
            const filterRequest = {
                "userId": req.decoded.userId
            }
            labelService.getAllLabel(filterRequest).then((data) => {
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
     * @description :updateLabel controller .
     * @param :  req
     * @param :  res
     * @returns : res.send(result)
     */
    updateLabel(req, res, next) {
        try {
            if (typeof req.body.labelId === 'undefined') {
                next(new Error('labelId is missing'));
            }
            if (typeof req.body.labelName === 'undefined') {
                next(new Error('labelName is undefined'));
            }
            const filterRequest = {
                'userId': req.decoded.userId,
                'id': req.body.labelId,
                'labelName': req.body.labelName
            }
            labelService.updateLabel(filterRequest).then((data) => {
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
 * @description :deleteLabel controller .
 * @param :  req
 * @param :  res
 * @returns : res.send(result)
 */
    deleteLabel(req, res, next) {
        try {
            if (typeof req.body.labelId === 'undefined') {
                next(new Error('labelId is missing'));
            }
            const filterRequest = {
                'userId': req.decoded.userId,
                'id': req.body.labelId
            }
            labelService.deleteLabel(filterRequest).then((data) => {
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
    module.exports = new LabelController()