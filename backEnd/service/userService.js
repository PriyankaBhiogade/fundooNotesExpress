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
    async registerUser(req) {
        let data = await model.registerUser(req)
        return data;
    }
    async loginUser(req,findData){
        let data = await model.loginUser(req,findData)
        return data;
    }
    async resetPassword (req,callback) {
        console.log("data in service",req);
        
         await model.resetPassword(req,(err,result) => {
             if(err){
                 callback(err);
             }
             else{
                 console.log("resuli in service",result);
                 
                 callback(null,result)
             }
          })
     
    }
}
module.exports = new Service();