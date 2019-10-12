const redis = require('redis');
const client = redis.createClient();
/**
 * Purpose      :   Redis connection 
 * @file        :   redisConnectionService.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   20-09-2019
 **/
client.on('connect',  () => {
    console.log(`Redis connected successfully`);
});
client.on('error', (err) => {
    console.log(`Something went wrong ${err}`);
});