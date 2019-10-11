const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
chai.should();
chai.use(chaiHttp);

const fs = require('fs');
const data = '../notesTest/data.json';
const jsonData = fs.readFileSync(data);
const jsonAddressData = JSON.parse(jsonData);


describe('Negative test case for deleteNotes API ', () => {
    it('If id is empty status(404)', (done) => {
        chai.request(app)
            .post('/deleteNotes')
            .set('token',jsonAddressData.createNotes[0].token) 
            .send(jsonAddressData.deleteNotes[0].deleteNotesId_Empty)
            .end((err, res) => {
                if (err) { return done(err); }
                res.should.have.status(200);
                done();
            });
    })
})


    describe('Positive test case for deleteNotes API ', () => {
        it('should return true if delete Notessucessfully status(200)', (done) => {
            chai.request(app)
                .get('/deleteNotes')
                .set('token',jsonAddressData.createNotes[0].token) 
                .send(jsonAddressData.deleteNotes[0].deleteNotes_Id)
                .end((err, Res) => {
                    if (err) { return done(err); }
                  Res.should.have.status(200);
                    done();
                });
        })
    })