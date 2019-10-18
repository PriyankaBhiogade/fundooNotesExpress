/**
 * Purpose      :   Server contain connection betweeb server and database and it contain path or router.
 * @file        :   server.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   20-09-2019
 **/
require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const dbConfig = require('./config/dbConfig.js');
const routes = require('./routes/userRoute');
const expressValidator = require('express-validator');
var cors = require('cors');
    app.use(cors());
/**
* @description :Redis connection
*/
 require('./config/redisConnection');
/**
* @description :Express Validation
*/
app.use(expressValidator());
/**
* @description : Route path
*/
app.use('/', routes);
/**
* @description : Global Exception Handling Error message
*/
app.use((error, req, res, next) => {
 
    let response = {
        success: false,
        status: 500,
        message: error.message,
    }
    res.json(response);
})
/**
* @description : MongoDb Connection
*/
require('./config/mongoConnection');
/**
* @description : Server connection port
*/
app.get('/', (req, res) => {
 
    res.json(`message : Welcome to FundooNotes application.`);
});
app.listen(dbConfig.port, () => {
    
    console.log(`Server is listening on port ${dbConfig.port}`);
});
/**
* @description : Reminder notification using cron Schedule Task
*/
 require('./service/notificationService');

module.exports =  app 