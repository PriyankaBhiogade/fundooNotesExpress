const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);


const fs = require('fs');
const data = '../notesTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);
describe('Negative test case for createLabel API ', () => {
    it('If label field is empty status(422)', (done) => {
        chai.request(app)
            .post('/createLabel')
            .set('token',jsonAddressData.createLabel[0].token) 
            .send(jsonAddressData.createLabel[0].createLabel_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(422);
                done();
            });
    })
})
    describe('Positive test case for createLabel API ', () => {
        it('should return true if createLabel sucessfully status(200)', (done) => {
            chai.request(app)
                .post('/createLabel')
                .set('token',jsonAddressData.createLabel[0].token) 
                .send(jsonAddressData.createLabel[0].createLabel_AllFields)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })