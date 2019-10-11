const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../labelTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);


describe('Negative test case for deleteLabel API ', () => {
    it('If id is empty status(404)', (done) => {
        chai.request(app)
            .post('/deleteLabel')
            .set('token',jsonAddressData.deleteLabel[0].token) 
            .send(jsonAddressData.deleteLabel[0].deleteLabelId_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(200);
                done();
            });
    })
})


    describe('Positive test case for deleteLabel API ', () => {
        it('should return true if delete Label sucessfully status(200)', (done) => {
            chai.request(app)
                .get('/deleteLabel')
                .set('token',jsonAddressData.deleteLabel[0].token) 
                .send(jsonAddressData.deleteLabel[0].deleteLabel_Id)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })