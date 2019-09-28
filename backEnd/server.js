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
const mongoose = require('mongoose');
const routes = require('./routes/userRoute');
const expressValidator = require('express-validator');

const redis = require('redis');
const client = redis.createClient();
/**
* @description :redis connection
*/
client.on('connect', function () {
    console.log(`Redis connected successfully`);
});

client.on('error', function (err) {
    console.log(`Something went wrong ${err}`);
});
/**
* @description :Express Validation
*/
app.use(expressValidator());
/**
* @description : route path
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
* @description :MongoDb Connection
*/
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true

}).then(() => {

    console.log(`Successfully connected to the Database.....`);
}).catch((err) => {
    console.log(`Not connected to Database...${err}`);
    process.exit();
})
app.get('/', (req, res) => {
    res.json(`message : Welcome to FundooNotes application.`);
});
app.listen(dbConfig.port, () => {
    console.log(`Server is listening on port ${dbConfig.port}`);
})

