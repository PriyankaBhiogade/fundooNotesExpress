const redis = require('redis');
const client = redis.createClient();

class CacheingService {
    constructor() {}

}
client.set('token', token, redis.print);
client.get('token', (error, result) => {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('GET result  ->' + result);
});