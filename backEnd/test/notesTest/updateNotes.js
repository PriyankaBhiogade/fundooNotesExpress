const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../notesTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);

describe('Negative test case for updateNotes API ', () => {
    it('If all field is empty status(204)', (done) => {
        chai.request(app)
            .post('/updateNotes')
            .send(jsonAddressData.updateNotes[0].updateNotes_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(204);
                done();
            });
    })
})

    describe('Positive test case for updateNotes API ', () => {
        it('should return true if sucessfully forgot password and send mail status(200)', (done) => {
            chai.request(app)
                .post('/updateNotes')
                .send(jsonAddressData.updateNotes[0].updateNotes_AllFields)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })
    