const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../notesTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);
    describe('Positive test case for search API ', () => {
        it('should return true if search the Notes sucessfully status(200)', (done) => {
            chai.request(app)
                .post('/search')
                .set('token',jsonAddressData.search[0].token) 
                .send(jsonAddressData.search[0].search)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })