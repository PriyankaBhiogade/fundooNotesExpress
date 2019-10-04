const labelModel = require('../app/models/labelsModel');
/**
 * Purpose      :   Sevices is derived from controller, and is attached to an 
                    instance of the models.
 * @file        :   labelService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   04-10-2019
 **/
class LabelService {
    constructor() { }
    /**
     * @description :create Label service.
     * @param :  req
     * @returns : data
     */
    createLabel(req, next) {
        try {
            console.log("in serv",req);

            return labelModel.createLabel(req);
        }
        catch (err) {
            next(err);
        }
    }
    /**
     * @description : getAllLabel service.
     * @param :  req
     * @returns : data
     */
    async getAllLabel(req, next) {
        try {
            return await labelModel.getAllLabel(req);
        } catch (err) {
            next(err);
        }
    }
    /**
     * @description : updateLabel service.
     * @param :  req
     * @returns : data
     */
    async updateLabel(req, next) {
        try {
            const id = {
                _id: req.id
            }
            const filterData = {
                labelName: req.labelName,
            }
            return await labelModel.updateLabel(id, filterData);
        } catch (err) {
            next(err);
        }
    }
    /**
     * @description : deleteLabel service.
     * @param :  req
     * @returns : data
     */
    async deleteLabel(req, next) {
        try {
            return await labelModel.deleteLabel(req);
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new LabelService();
