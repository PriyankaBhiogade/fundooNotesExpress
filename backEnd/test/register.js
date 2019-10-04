const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../test/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);

describe('Negative test case for register API ', () => {
    it('If all field is empty status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If FirstName is empty status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_FirstName)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If LastName is empty status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_LastName)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If Email is empty status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_Email)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If Password is empty status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_Password)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If Password Length is less than 5 status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_MinLength_Password)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.length.status(422);
                done();
            });
    })

    it('If Email is Invalid status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_Invalid_Email)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If FirstName Invalid status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_Invalid_FirstName)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })

    it('If LastName is Invalid  status(422)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_Invalid_LastName)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })
})

describe('Positive test case for register API ', () => {
    it('should return true if register sucessfully status(200)', (done) => {
        chai.request(app)
            .post('/register')
            .send(jsonAddressData.register[0].register_AllFields)
            .end((err, Res) => {
                if (err) { return done(err); }
              Res.should.have.status(200);
                done();
            });
    })
})