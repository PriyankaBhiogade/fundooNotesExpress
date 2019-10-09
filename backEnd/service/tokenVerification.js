const jwt = require('jsonwebtoken');
const redis = require('redis');
const client = redis.createClient();
/**
 * Purpose      :   This token Verify service file  for verify Token.
 * @file        :   tokenVerifyService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   23-09-2019
 **/

const checkToken = (req, res, next) => {
    let token = req.headers['token'];    
    if (token) {
        jwt.verify(token, process.env.secretekey, (err, decoded) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                console.log("data",  decoded);
                
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
