const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Purpose      :   UserModels is derived from services, and deaclared all schema to stord data into database 
                    and return promise to services.
 * @file        :   usermodels.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-9-2019
 **/

/** 
 * @discription : Create user schema in database
 */
const userSchema = new schema({
    firstName: {
        type: String,
        required: true,
        useCreateIndex: true
    },
    lastName: {
        type: String,
        required: true,
        useCreateIndex: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        useCreateIndex: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    isVerified:
    {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    });



const userModel = mongoose.model('register', userSchema);
class Model {
    constructor() { }
    /**
     * @description : FindEmail is a function which find user is already register or not.
     * @param : request
     * @returns : promise
     */
    findEmail(req, next) {
        try {
            return new Promise((resolve, reject) => {
                userModel.find({ 'email': req.email }).then((data) => {
                    if (data.length < 0) {
                        resolve({ 'message': 'not found data register first', 'data': data });
                    }
                    else {
                        resolve({ 'message': 'already exits', 'data': data });
                    }
                }).catch((err) => {
                    reject({ 'success': true, 'status': 500, 'message': 'Internal Server Error ', 'Error': err })
                })
            })
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * @description :registerUser function for register new user and stored data into database using save() method .
     * @param :  body
     * @returns : promise
     */
    createUser(body, next) {
        try {
            return new Promise((resolve, reject) => {
                let newRegister = new userModel({
                    'firstName': body.firstName,
                    'lastName': body.lastName,
                    'email': body.email,
                    'password': body.password = bcrypt.hashSync(body.password, saltRounds)
                })
                let response = {
                    success: true,
                    status: 200
                }
                newRegister.save().then((data) => {
                    response.success,
                        response.status,
                        response.data = data
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
            })
        } catch (error) {
            next(error);
        }
    }
    /**
     * @description :loginUser function for login user and genrated token.
     * @param :  body
     * @param :  findData
     * @returns : promise
     */
    loginUser(body, findData, next) {
        try {
            return new Promise((resolve, reject) => {

                // const bPassword = body.password = bcrypt.hashSync(body.password, saltRounds)
                bcrypt.compare(body.password, findData.password).then((data) => {
                    if (data == true) {
                        console.log("datdats",findData.profilePic)
                        const response = {
                            'userId': findData._id,
                            'email': findData.email,
                            'firstName': findData.firstName,
                            'lastName': findData.lastName,
                             'profilePic':findData.profilePic
                        }
                        resolve({ response });
                    }
                    else {
                        resolve(false);
                    }

                }).catch((error) => {
                    reject(error);
                })
            })
        } catch (error) {
            throw (error);
        }
    }
    /**
     * @description :forgotPasswordUser function for forgot Password
     * @param :  body
     * @returns : promise
     */
    forgotPasswordUser(body, findData, next) {
        try {
            return new Promise((resolve, reject) => {
                if (findData.email == body.email) {
                    resolve({});
                }
                else {
                    resolve({ 'success': false, 'status': 400, 'message': 'Invalid Password' });
                }
            }).catch((error) => {
                reject(error);
            })
        }
        catch (error) {
            next(error);
        }
    }
    /**
     * @description :resetPassword function for create new password.
     * @param :  body
     * @param :  callback
     * @returns : promise
     */
    update(req,body, callback) {
        try {
            var promise = new Promise((resolve, reject) => {
                userModel.updateOne({ email:req.decoded.response.email}, { $set:body}, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            })
            promise.then((data) => {
                return callback(null, data)
            }).catch((err) => {
                return callback(err)
            })
        } catch (error) {
            return (error);
        }
    }
}
module.exports = new Model();

