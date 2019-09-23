var jwt = require('jsonwebtoken');

/**
 * Purpose      :   This utility is reqired to write logic of verify token.
 * @file        :   utility.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/

 const checkToken = (req, res, next) =>  {
    let token = req.headers['token'];
    if (token) {
        jwt.verify(token, 'secretekey', (err, decoded) => {
            console.log("decoded error",err);
            
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        // if there is no token return an error
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports = {
    checkToken
};
