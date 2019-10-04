const mongoose = require('mongoose');
const schema = mongoose.Schema;
/**
 * Purpose      :   labelModel is derived from services, and deaclared all schema to stord data into database 
                    and return promise to services.
 * @file        :   labelModels.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   4-10-2019
 **/

/** 
 * @discription : Create label schema in database
 */
const labelSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User Id is requred']
    },
    labelName: {
        type: String,
        required: [true, 'Label is requred']
    },
},
    {
        timestamps: true
    });
const labelModel = mongoose.model('labels', labelSchema);
class LabelModel {
    constructor() { }
    /**
     * @description : createLabel is a function for creating new Label and stored data into database using save() method ..
     * @param : request
     * @returns : promise
     */
    createLabel(body, next) {
        try {
            console.log("in model",body);

            return new Promise((resolve, reject) => {
                let newLabel = new labelModel({
                    labelName: (body.labelName == null) ? "" : body.labelName,
                     'userId': body.userId
                })
                let response = {
                    successs: false,
                    status: 500,
                    messege: "Label not created ",
                    data: {}
                }
                newLabel.save().then((data) => {
                    response.successs = true,
                        response.status = 200,
                        response.messege = "Label created Sucessfully",
                        response.data = data
                    resolve(response);
                }).catch((error) => {
                    response.data = error
                    reject(response);
                })
            })
        }
        catch (error) {
            next(error);
        }
    }

 /**
   * @description : getAllLabel is a function to get all Label ..
   * @returns : promise
   */
  getAllLabel(field, next) {
    try {
        return new Promise((resolve, reject) => {
            let response = {
                successs: false,
                status: 500,
                messege: "All Label not display",
                data: {}
            }
            labelModel.find(field).then((data) => {
                response.successs = true,
                    response.status = 200,
                    response.messege = "All Label display Sucessfully",
                    response.data = data
                resolve(response);
            }).catch((err) => {
                response.data = err
                reject(response);
            })
        })

    } catch (err) {
        next(err);
    }
}

/**
* @description : updateLabel is a function for update label by id ..
* @param : request
* @returns : promise
*/
updateLabel(id, filterData, next) {
    try {
        return new Promise((resolve, reject) => {
            let response = {
                successs: false,
                status: 500,
                messege: "label not update ",
                data: {}
            }
            labelModel.updateOne(id, filterData).then((data) => {
                response.successs = true,
                    response.status = 200,
                    response.messege = `label update Sucessfully`,
                    response.data = data
                resolve(response);
            }).catch((err) => {
                response.data = err
                reject(response);
            })
        })
    } catch (err) {
        throw (err);
    }
}
/**
* @description : deleteLabel is a function for delete the label by id ..
* @param : request
* @returns : promise
*/
deleteLabel(body, next) {
    try {
        return new Promise((resolve, reject) => {
            let response = {
                successs: false,
                status: 500,
                messege: `Label not deleted`,
                data: {}
            }
            labelModel.deleteOne({ _id: body.id }).then((data) => {
                response.successs = true,
                    response.status = 200,
                    response.messege = `Label deleted Sucessfully`,
                    response.data = data
                resolve(response);
            }).catch((err) => {
                response.data = err
                reject(response);
            })
        })

    } catch (err) {
        next(err);
    }
}


}
module.exports = new LabelModel();
