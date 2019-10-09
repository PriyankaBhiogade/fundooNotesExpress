const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../notesTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);
    describe('Positive test case for reminder API ', () => {
        it('should return true if reminder set to Notes sucessfully status(200)', (done) => {
            chai.request(app)
                .post('/isArchive')
                .set('token',jsonAddressData.reminder[0].token) 
                .send(jsonAddressData.reminder[0].reminder)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })