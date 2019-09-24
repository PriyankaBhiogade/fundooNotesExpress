const model = require('../app/models/userModel');
/**
 * Purpose      :   Sevices is derived from controller, and is attached to an 
                    instance of the models.
 * @file        :   userService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/

class Service {
    constructor() { }
    /**
     * @description :registerUser service.
     * @param :  req
     * @returns : data
     */
    async registerUser(req) {
        console.log("req in service", req);
        let findData = await model.findEmail(req);
        let result;
        if (findData.data.length == 0) {
            result = await model.registerUser(req)
            return result;;
        }
        else {
            result = {
                success: false,
                status: 400,
                message: "Email already exisits!"
            }
            return (result);
        }
    }
    /**
     * @description :loginUser service.
     * @param :  req
     * @param :  findData
     * @returns : data
     */
    async loginUser(req, findData) {
        console.log("req in service", req);
        console.log("req in findData", findData);
        let findData = await model.findEmail(req);
        let result;
        if (findData.data.length == 0) {
            result = {
                success: false,
                status: 404,
                message: "Email is not found"
            }
            return (result);
        }
        else {
            result = await model.loginUser(req, findData.data[0]);
            return (result);

        }
    }
    /**
     * @description :resetPassword service.
     * @param :  req
     * @param :  callback
     * @returns : callback(result) 
     */
    async resetPassword(req, callback) {
        console.log("data in service", req);

        const responseResult = {};
        await model.resetPassword(req, (err, data) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                callback(responseResult);
            }
            else {
                responseResult.success = true;
                responseResult.result = data;
                responseResult.message = "Password Reset Sucessfully"
                callback(null,responseResult);
            }
        })
    }
}
module.exports = new Service();