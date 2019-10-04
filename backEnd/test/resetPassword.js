const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../test/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);

describe('Negative test case for resetPassword API ', () => {
    it('If all field is empty status(422)', (done) => {
        chai.request(app)
            .post('/reset')
            .set('Authorization',jsonAddressData.resetPassword[0].token)
            .send(jsonAddressData.resetPassword[0].resetPassword_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If Password Length is less than 5 status(422)', (done) => {
        chai.request(app)
            .post('/reset')
            .set('Authorization', jsonAddressData.resetPassword[0].token)
            .send(jsonAddressData.resetPassword[0].resetPassword_MinLength_Password)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.length.status(422);
                done();
            });
    })

    it('If Email is Invalid status(422)', (done) => {
        chai.request(app)
            .post('/reset')
            .set('Authorization',jsonAddressData.resetPassword[0].token)
            .send(jsonAddressData.resetPassword[0].resetPassword_Invalid_Email)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

//     it('If Token is empty status(422)', (done) => {
//         chai.request(app)
//             .post('/reset')
//             .set('Authorization',jsonAddressData.resetPassword[0].token_Empty)
//             .send(jsonAddressData.resetPassword[0].resetPassword_AllFields)
//             .end((err, res) => {
//                 if (err) { return done(err); }
//                 res.should.have.status(422);
//                 done();
//             });
//     })
})

describe('Positive test case for resetPassword API ', () => {
    it('should return true if resetPassword sucessfully status(200)', (done) => {
        chai.request(app)
            .post('/reset')
            .set('Authorization',jsonAddressData.resetPassword[0].token)
            .send(jsonAddressData.resetPassword[0].resetPassword_AllFields)
            .end((err, Res) => {
                if (err) { return done(err); }
              Res.should.have.status(200);
                done();
            });
    })
})