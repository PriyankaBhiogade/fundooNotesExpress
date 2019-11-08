const model = require('../app/models/userModel');
let sendmailer = require('../service/sendMailService');
let jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
                result = await model.createUser(req)
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
        * @description :registerUser service.
        * @param :  req
        * @returns : data
        */

    isVerified(req, callback, next) {
        try {
            const data = { isVerified: true }       
            model.update(req, data, (err, data) => {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, data)
                }
            })

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
                    message: "Email is not found"
                }
                return (result);
            }
            else {
                const result = await model.loginUser(req, findData.data[0])                
                return (result);
            }
        }
        catch (error) {
            throw (error)
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
                // let token = jwt.sign({ payload }, process.env.secretekey, { expiresIn: "24hr" });
                // const url = `${process.env.resetPasswordUrl}${token}`;
                // sendmailer.sendMail(url);
                return (result);
            }
        }
        catch (error) {
            throw (error);
        }
    }
    /**
     * @description :resetPassword service.
     * @param :  req
     * @param :  callback
     * @returns : callback(result) 
     */
    resetPassword(req, data, callback) {
        try {
            const responseResult = {
                success: false,
                message: "Invalid Password",
                result: {}
            };
            let newPassword = bcrypt.hashSync(data.password, saltRounds);
            newPassword = {
                password: newPassword
            }

            model.update(req, newPassword, (err, data) => {
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
            throw (error)
        }
    }
    /**
     * @description :upload profile pic service.
     * @param :  req
     * @returns : result
     */
    async uploadProfilePic(req,body, callback) {
        try {           
            await model.update(req,body, (err, data) => {
                if (err) {
                    return callback(err)
                }
                else {                   
                    return callback(null, data)
                }
            });

        } catch (error) {
            throw (error)
        }
    }
    notificationToken(req){
        model.notificationTokenSet(req)
        }
}
module.exports = new Service();