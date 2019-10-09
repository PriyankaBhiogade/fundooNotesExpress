const service = require('../service/userService');
// const uploadService = require('../service/s3ImplementaionService');
let jwt = require('jsonwebtoken');
const token = require('../service/tokenGenerate');
let sendmailer = require('../service/sendMailService');
let cacheingService = require('../service/cacheingService');
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
    registerUser(req, res, next) {
     
        try {
            /*
            * @description :validation using expressValidator
            */
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
                return res.status(422).send(response);
            }
            else {
                const filterRequest = {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "email": req.body.email,
                    "password": req.body.password
                }
                service.registerUser(filterRequest).then((result) => {
               console.log("result cpntro",result.data._id);

                    const payload = {
                        id:result.data._id
                    }
                    console.log("payload",payload);
                    
                    const tokenGenerate = token.GenerateToken(payload)
                    const url = `http://localhost:3000/register/isVerified:token/${tokenGenerate.token}`;
                    sendmailer.sendMail(url, req.body.email);
                    res.status(200).send(result);
                }).catch((err) => {
                    res.send(err);
                })
            }
        }
        catch (error) {
            next(error)
        }
    }

     /**
    * @description :isVerified register user .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    isVerified(req, res, next) {
        try {
            const responseResult = {
                success: false,
                message: "user Not verify..",
                data: {}
            };
            service.isVerified(req).then((data) => {
                responseResult.success = true,
                    responseResult.message = "User verified successfully",
                    responseResult.data = data
                res.status(200).send(responseResult)
            }).catch((err) => {
                responseResult.data = err
                res.status(400).send(responseResult)
            })
        }
        catch (err) {
            next(err);
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
                return res.status(422).send(response);
            }
            else {
                const filterRequest = {
                    "email": req.body.email,
                    "password": req.body.password
                }
                let result = await service.loginUser(filterRequest);

                let payload = result
                /*
                * token genrated
                */
                let token = jwt.sign(payload, process.env.secretekey, { expiresIn: "24hr" });
                /*
                * token set and get using redis 
                */
                cacheingService.cacheingService(token)

                let response = {
                    success: true,
                    'message': 'Login Sucessfully',
                    data: token
                }
                res.status(200).send(response);
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

    forgotPassword(req, res, next) {
        try {
            req.check('email').isEmail()
                .withMessage('Invalid Email!')
                .notEmpty({ message: 'Email is required' })
            const errors = req.validationErrors();
            let response = {
                success: false,
                message: "Invalid Input",
                data: { errors }
            }
            if (errors) {
                return res.status(422).send(response);
            }
            else {
                const filterRequest = {
                    "email": req.body.email
                }
                service.forgotPasswordUser(filterRequest).then((result) => {
                    client.get('token', (error, token) => {
                        if (error) {
                            console.log(error);
                            throw error;
                        }
                        const url = `${process.env.resetPasswordUrl}${token}`;
                        sendmailer.sendMail(url);
                        response.success = true,
                            response.message = "Password Forgot Sucessfully",
                            response.data = url
                        res.status(200).send(response);
                    })
                }).catch((err) => {
                    res.status(400).send(err);
                })
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
                .notEmpty({ message: 'Password is required' })

            const errors = req.validationErrors();
            let response = {
                success: false,
                message: "Invalid Input",
                data: { errors }
            }
            if (errors) {
                res.status(422).send(response);
            }
            else {
                const filterRequest = {
                    "password": req.body.password
                }
                await service.resetPassword(req, filterRequest, (err, data) => {

                    if (err) {
                        // res.status(400).send(data);
                    }
                    else {
                        res.status(200).send(data);
                    }
                })
            }
        }
        catch (error) {
            throw (error)
        }
    }

    /**
    * @description :s3 implementaion controller for storing image.
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    async upload(req, res) {
        const fileUpload = await uploadService.single('image')
        const responseResult = {
            success: false,
            message: "Error while uploading the image..",
            data: {}
        };
        return new Promise((resolve, reject) => {
            fileUpload(req, res, (err) => {
                try {
                    if (err) {
                        responseResult.message = err;
                        reject(res.send(responseResult));
                    }
                    else {
                        responseResult.success = true;
                        responseResult.message = "Image uploaded successfully.."
                        responseResult.data = req.file.location;
                        console.log("controller", req.file.metadata.fieldName);
                        resolve(res.send(responseResult));
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