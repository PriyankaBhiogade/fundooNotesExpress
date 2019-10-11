const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../labelTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);

    describe('Positive test case for getAllLabel API ', () => {
        it('should return true if get All Label sucessfully status(200)', (done) => {
            chai.request(app)
                .get('/getAllLabel')
                .set('token',jsonAddressData.createLabel[0].token) 
                .send()
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })