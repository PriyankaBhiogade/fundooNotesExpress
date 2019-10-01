// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../server')
// const assert = require('chai').assert
// chai.use(chaiHttp);
// const data = require('./data.json');
// /** 
// * Purpose      :   Create test cases for user models
// * @file        :   test.js
// * @author      :   PriyankaBhiogade
// * @version     :   1.0
// * @since       :   26-09-2019
// **/

// describe('FundooUserBackEnd', () => {
//     let server;
//     beforeEach((done) => {
//         console.log("server started");
//         server = app.listen(done);
//     });

//     afterEach((done) => {
//         console.log("server stopped");
//         server.close(done);
//     });
// })

// /**
// * purpose: Create Test case for login API
// **/

// it('should return true if register sucessfully', (done) => {
//     chai.request(process.env.testURL)
//         .post('/register')
//         .send(data.register)
//         .end((err, Res) => {
//             if (err) { return done(err); }
//             assert.equal(Res.status, 200);
//             done();
//         });
// })
// /**
// * purpose: Create Test case for login API
// **/
// it('should return true if login sucessfully', (done) => {
//     chai.request(process.env.testURL)
//         .post('/login')
//         .send(data.login)
//         .end((err, Res) => {
//             if (err) { return done(err); }
//             assert.equal(Res.status, 200);
//             done();
//         });
// })

// /**
//  * purpose: Create Test case for reset-Password API
//  **/

// it('should return true if sucessfully reset password', (done) => {
//     chai.request(process.env.testURL)
//         .post('/resetPassword')
//         .set('Authorization', data.token)
//         .send(data.resetPassword)
//         .end(function (err, loginRes) {
//             if (err) { return done(err); }
//             assert.equal(loginRes.status, 404);
//             done();
//         });
// })

// /**
//  * purpose: Create Test case for upload image in s3
//  **/

// it('should return true if sucessfully upload file',(done) => {
//     chai.request(process.env.testURL)
//         .post('/upload')
//         // .attach('image','/home/user/Downloads/img_1560320616843.png')
//          .attach(data.uploadImage)
//         .end((err, Res) => {
//             if (err) { return done(err); }
//             assert.equal(Res.status, 200);
//             done();
//         });
// });

// /**
//  * purpose: Create Test case for forgot-Passworde API
//  **/
// it('should return true if sucessfully forgot password and send mail', (done) => {
//     chai.request(process.env.testURL)
//         .post('/forgotPassword')
//         .send(data.forgotPassword)
//         .end((err, Res) => {
//             if (err) { return done(err); }
//             assert.equal(Res.status, 200);
//             done();
//         });
// });


