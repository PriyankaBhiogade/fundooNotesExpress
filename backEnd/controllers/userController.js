const service = require('../service/userService');

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
    async registerUser(req, res) {
      
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

    /**
    * @description :loginUser controller .
    * @param :  req
    * @param :  res
    * @returns : res.send(result)
    */
    async loginUser(req, res) {
        req.check('email').isEmail()
            .withMessage('Invalid Email!')
            .notEmpty({ message: 'Email is required' })

        req.check('password').isLength({ min: 5 })
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
                "email": req.body.email,
                "password": req.body.password
            }
            let result = await service.loginUser(filterRequest, findData.data[0]);
            res.send(result);
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
        req.check('password').isLength({ min: 5 })
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
}
module.exports = new Controller();