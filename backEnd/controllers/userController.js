const service = require('../service/userService');
const model = require('../app/models/userModel');

/**
 * Purpose      :   Controller is derived from routes, and is attached to an instance of the services.
 * @file        :   userControllers.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/

class Controller {
    constructor() { }
    async registerUser(req, res) {
        let findData = await model.findEmail(req.body);
        let result;
        if (findData.data.length == 0) {
            result = await service.registerUser(req.body);
            res.send(result);
        }
        else {
            result = {
                success: false,
                status: 400,
                message: "Email already exisits!"
            }
            res.send(result);
        }
    }
    async loginUser(req, res) {
        let findData = await model.findEmail(req.body);
        let result;
        if (findData.data.length == 0) {
            result = {
                success: false,
                status: 404,
                message: "Email is not found"
            }
            res.send(result);
        }
        else {
            result = await service.loginUser(req.body,findData.data[0]);
            res.send(result);

        }
    }
    //using callback
    async resetPassword (req, res) {
            const responseResult = {};
            await service.resetPassword(req.body, (err, data) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.error = err;
                    res.status(400).send(responseResult)
                }
                else {
                    responseResult.success = true;
                    responseResult.result = data;
                    responseResult.message = "Password Reset Sucessfully"
                    res.status(200).send(responseResult);
                }
            })
        }
    }
module.exports = new Controller();