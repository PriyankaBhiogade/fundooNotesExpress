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
    }
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
    registerUser(body, next) {
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
                        response.data = { data }
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
                bcrypt.compare(body.password, findData.password).then((data) => {
                    if (data == true) {
                        resolve({});
                    }
                    else {
                        resolve({ 'success': false, 'status': 400, 'message': 'Invalid Password' });
                    }
                }).catch((error) => {
                    reject(error);
                })
            })
        } catch (error) {
            next(error);
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
                    console.log("forgot Password Sucessfully");
                    resolve({});
                }
                else {
                    console.log("Invalid email");
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
    resetPassword(body, callback, next) {
        try {
            let newPassword = bcrypt.hashSync(body.password, saltRounds)
            userModel.updateOne({ _id: body.id }, { $set: { password: newPassword } }, (err, result) => {
                if (err) {
                    console.log("Error", err)
                    callback(err);
                }
                else {

                    return callback(null, result)
                }
            })
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new Model();

