

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const data = require('../test/data.json')
// const fs = require('fs');
// const data = '../test/data.json';
chai.should();
chai.use(chaiHttp);


// const jsonData = fs.readFileSync(data);   
// const jsonAddressData = JSON.parse(jsonData);                                           )
describe('Negative testing for register API ', () => {
it('If all field is empty', (done) => {
    chai.request(app)
        .post('/register')
        .send(data.registerEmpty)
        .end((err,res) => {
            res.should.have.status(422);
            done();
        });
    })
})