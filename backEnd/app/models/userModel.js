const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
let jwt = require('jsonwebtoken');

/**
 * Purpose      :   UserModels method is derived from services, and deaclared all schema to stord data into database 
                    and return callback to services.
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
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('register', userSchema);
class Model {

    /**
     * @description : FindEmail is a function which find user is already register or not.
     * @param : request
     * @returns : promise
     */
    findEmail(req) {
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
    /**
     * @description :registerUser function for register new user and stored data into database using save() method .
     * @param :  body
     * @returns : promise
     */
    registerUser(body) {
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
                response.data = data,
                    response.success,
                    response.status
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        })
    }
    /**
     * @description :loginUser function for login user and genrated token.
     * @param :  body
     * @param :  findData
     * @returns : promise
     */
    loginUser(body, findData) {
        let payload = {
            'firstName': findData.firstName,
            'lastName': findData.lastName,
            'email': findData.email
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(body.password, findData.password).then((data) => {
                if (data == true) {
                    let token = jwt.sign({ payload }, "secretekey", { expiresIn: "2hr" });
                    console.log("Login Sucessfully");
                    resolve({ 'success': true, 'status': 200, 'message': 'Login Sucessfully', 'User': payload, 'Token': token });
                }
                else {
                    console.log("Invalid Password");
                    resolve({ 'success': false, 'status': 400, 'message': 'Invalid Password' });
                }
            }).catch((error) => {
                reject(error);
            })
        })
    }
    /**
     * @description :resetPassword function for create new password.
     * @param :  body
     * @param :  callback
     * @returns : promise
     */
    resetPassword(body, callback) {
        console.log("body in model", body)
        let newPassword = bcrypt.hashSync(body.password, saltRounds)
        userModel.updateOne({ _id: body.id }, { password: newPassword }, (err, result) => {
            if (err) {
                console.log("Error", err)
                callback(err);
            }
            else {

                return callback(null, result)
            }
        })
    }
}
module.exports = new Model();

