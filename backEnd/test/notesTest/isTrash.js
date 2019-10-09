const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../notesTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);
    describe('Positive test case for isTrash API ', () => {
        it('should return true if isTrash set to Notes sucessfully status(200)', (done) => {
            chai.request(app)
                .post('/isTrash')
                .set('token',jsonAddressData.isTrash[0].token) 
                .send(jsonAddressData.isTrash[0].isTrash)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })