const redis = require('redis');
const client = redis.createClient();

/**
 * Purpose      :   Redis cache Service to set token and get.
 * @file        :   cacheingService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   07-09-2019
 **/
class CacheingService {
    constructor() {}

    cacheingService(token){
         client.set('Auth'+token, token, redis.print);

        // client.get('token', (error, result) => {
    //         if (error) {
    //             console.log(error);
    //             throw error;
    //         }
    //         console.log('GET result  ->' + result);
    //     });
    }


} module.exports = new CacheingService();
