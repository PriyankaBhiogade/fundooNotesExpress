const model = require('../app/models/userModel');
let sendmailer = require('../service/sendMailService');
let jwt = require('jsonwebtoken');

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
    async registerUser(req, next) {
        try {
            let findData = await model.findEmail(req);
            let result;
            if (findData.data.length == 0) {
                result = await model.registerUser(req)
                return result;;
            }
            else {
                result = {
                    success: false,
                    message: "Email already exisits!"
                }
                return (result);
            }
        }
        catch (error) {
            next(error)
        }
    }
    /**
     * @description :loginUser service.
     * @param :  req
     * @param :  findData
     * @returns : data
     */
    async loginUser(req, next) {
        try {
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
        catch (error) {
            next(error)
        }
    }

    /**
     * @description : forgotPasswordUser service.
     * @param :  req
     * @returns : (result) 
     */
    async forgotPasswordUser(req) {
        try {
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
                let payload = {
                    'id': findData.data[0]._id,
                    'email': findData.data[0].email
                }
            
                result = await model.forgotPasswordUser(req, findData.data[0]);
                let token = jwt.sign({ payload }, process.env.secretekey, { expiresIn: "24hr" });
                const url = `${process.env.resetPasswordUrl}${token}`;
                sendmailer.sendMail(url);
                
                return (url);
            }
        }
        catch (error) {
            throw(error);
        }
    }
    /**
     * @description :resetPassword service.
     * @param :  req
     * @param :  callback
     * @returns : callback(result) 
     */
    async resetPassword(req, callback) {
        try {
            const responseResult = {
               success : false,
               message : "Invalid Password ",
               result : {}
            };
            await model.resetPassword(req, (err, data) => {
                if (err) {
                    responseResult.result = err;
                    callback(responseResult);
                }
                else {
                    responseResult.success = true;
                    responseResult.message = "Password Reset Sucessfully"
                    responseResult.result = data;
                    callback(null, responseResult);
                }
            })
        }
        catch (error) {
            throw(error)
        }
    }
}
module.exports = new Service();