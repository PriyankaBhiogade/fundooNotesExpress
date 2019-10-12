
const mongoose = require('mongoose');
const dbConfig = require('./dbConfig');
/**
 * Purpose      :   connected to mongoDb 
 * @file        :   mongoConnection.js
 * @author      :   PriyankaBhiogade
 * @version     :   1.0
 * @since       :   20-09-2019
 **/
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url , {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
    console.log(`Successfully connected to the Database.....`);
}).catch((err) => {
    console.log(`Not connected to Database...${err}`);
    process.exit();
})