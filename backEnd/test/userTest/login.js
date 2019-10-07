const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../../test/userTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);

describe('Negative test case for login API ', () => {
    it('If all field is empty status(422)', (done) => {
        chai.request(app)
            .post('/login')
            .send(jsonAddressData.login[0].login_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })
    it('If Email is empty status(422)', (done) => {
        chai.request(app)
            .post('/login')
            .send(jsonAddressData.login[0].login_Email)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If Password is empty status(422)', (done) => {
        chai.request(app)
            .post('/login')
            .send(jsonAddressData.login[0].login_Password)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If Password Length is less than 5 status(422)', (done) => {
        chai.request(app)
            .post('/login')
            .send(jsonAddressData.login[0].login_MinLength_Password)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.length.status(422);
                done();
            });
    })

    it('If Email is Invalid status(422)', (done) => {
        chai.request(app)
            .post('/login')
            .send(jsonAddressData.login[0].login_Invalid_Email)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })
})
describe('Positive test case for login API ', () => {
    it('should return true if login sucessfully  status(200)' , (done) => {
        chai.request(app)
            .post('/login')
            .send(jsonAddressData.login[0].login_AllFields)
            .end((err, Res) => {
                if (err) { return done(err); }
              Res.should.have.status(200);
                done();
            });
    })
})