const service = require('../service/userService');
const uploadService = require('../service/s3ImplementaionService');
let jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();
require('dotenv').config()

/**
 * Purpose      :   Controller is derived from routes, and is attached to an instance of the services.
 * @file        :   userControllers.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/

class Controller {
    constructor() { }
    /**
    * @description :registerUser controller .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    async registerUser(req, res, next) {
        try {
            req.checkBody('firstName').isAlpha()
                .withMessage('No Special characters or number ..Invalid FirstName! ')
                .notEmpty({ message: 'FirstName is required' })
                .isLength({ min: 3 })

            req.checkBody('lastName').isAlpha()
                .withMessage('No Special characters or number ..Invalid LastName! ')
                .notEmpty({ message: 'LastName is required' })
                .isLength({ min: 3 })

            req.checkBody('email').isEmail()
                .withMessage('Invalid Email!')
                .notEmpty({ message: 'Email is required' })

            req.checkBody('password').isLength({ min: 5 })
                .withMessage('Minimun 5 char or number')

            const errors = req.validationErrors();
            let response = {
                success: false,
                status: 422,
                message: "Invalid Input",
                data: { errors }
            }
            if (errors) {
                return res.send(response);
            }
            else {
                const filterRequest = {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "email": req.body.email,
                    "password": req.body.password
                }
                let result = await service.registerUser(filterRequest);
                res.send(result);
            }
        }
        catch (error) {
            next(error)
        }
    }

    /**
    * @description :loginUser controller .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    async loginUser(req, res, next) {
        try {
            req.check('email').isEmail()
                .withMessage('Invalid Email!')
                .notEmpty({ message: 'Email is required' })

            req.check('password').isLength({ min: 5 })
                .withMessage('Minimun 5 char or number')

            const errors = req.validationErrors();
            let response = {
                success: false,
                message: "Invalid Input",
                data: { errors }
            }
            if (errors) {
                return res.send(response);
            }
            else {
                const filterRequest = {
                    "email": req.body.email,
                    "password": req.body.password
                }
                let result = await service.loginUser(filterRequest);
                let payload = {
                    'email': req.body.email
                }
                /*
                * token genrated
                */
                let token = jwt.sign({ payload }, process.env.secretekey, { expiresIn: "24hr" });
                /*
                * token set and get using redis 
                */
                client.set('token', token, redis.print);
                client.get('token', (error, result) => {
                    if (error) {
                        console.log(error);
                        throw error;
                    }
                    console.log('GET result ->' + result);
                });
                let response = {
                    success: true,
                    'message': 'Login Sucessfully',
                    data: token
                }

                res.send(response);
            }
        }
        catch (error) {
            next(error)
        }
    }

    /**
    * @description :forgotPassword controller .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */

    async forgotPassword(req, res, next) {
        try {
            req.check('email').isEmail()
                .withMessage('Invalid Email!')
                .notEmpty({ message: 'Email is required' })
            const errors = req.validationErrors();
            let response = {
                success: false,
                status : 400,
                message: "Invalid Input",
                data: { errors }
            }
            if (errors) {
                return res.send(response);
            }
            else {
                const filterRequest = {
                    "email": req.body.email
                }
                let result = await service.forgotPasswordUser(filterRequest);
                response.success = true,
                    response.status = 200,
                    response.message = "Password Forgot Sucessfully",
                    response.data = result
                res.send(response);
            }
        } catch (error) {
            next(error)
        }
    }
    /**
    * @description :resetPassword controller .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    //using callback
    async resetPassword(req, res) {
        try {
            req.check('password').isLength({ min: 5 })
                .withMessage('Minimun 5 char or number')

            const errors = req.validationErrors();
            let response = {
                success: false,
                message: "Invalid Input",
                data: { errors }
            }
            if (errors) {
                return res.send(response);
            }
            else {
                const filterRequest = {
                    "password": req.body.password
                }
                await service.resetPassword(filterRequest, (err, data) => {
                    if (err) {
                        res.status(400).send(data);
                    }
                    else {
                        res.status(200).send(data);
                    }
                })
            }
        }
        catch (error) {
            throw(error)
        }
    }

    /**
    * @description :s3 implementaion controller for storing image.
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    upload(req, res) {
        const fileUpload = uploadService.single('image')
        const responseResult = {
            success: false,
            message: "Error while uploading the image..",
            data: {}
        };
        return new Promise(function (resolve, reject) {
            fileUpload(req, res, (err) => {
                try {
                    if (err) {
                        responseResult.message = err;
                        reject(res.status(404).send(responseResult));
                    }
                    else {
                        responseResult.success = true;
                        responseResult.message = "Image uploaded successfully.."
                        //  responseResult.data = req.file.location;
                        
                        resolve(res.status(200).send(responseResult));
                    }
                }
                catch (err) {
                    throw (err);
                }
            })
        })
    }
}
module.exports = new Controller();