const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../../test/userTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);

describe('Negative test case for forgotPassword API ', () => {
    it('If all field is empty status(422)', (done) => {
        chai.request(app)
            .post('/forgotPassword')
            .send(jsonAddressData.forgotPassword[0].forgotPassword_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })
    it('If Email is empty status(422)', (done) => {
        chai.request(app)
            .post('/forgotPassword')
            .send(jsonAddressData.forgotPassword[0].forgotPassword_Invalid_Email)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })
})
describe('Positive test case for forgotPassword API ', () => {
    it('should return true if sucessfully forgot password and send mail status(200)', (done) => {
        chai.request(app)
            .post('/forgotPassword')
            .send(jsonAddressData.forgotPassword[0].forgotPassword_AllFields)
            .end((err, Res) => {
                if (err) { return done(err); }
              Res.should.have.status(200);
                done();
            });
    })
})
