const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../labelTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);

describe('Negative test case for updateLabel API ', () => {
    it('If all field is empty status(204)', (done) => {
        chai.request(app)
            .post('/updateLabel')
            .send(jsonAddressData.updateLabel[0].updateLabel_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(200);
                done();
            });
    })
})

    describe('Positive test case for updateLabel API ', () => {
        it('should return true if sucessfully update label', (done) => {
            chai.request(app)
                .post('/updateLabel')
                .send(jsonAddressData.updateLabel[0].updateLabel_AllFields)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })
    