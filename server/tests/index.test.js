import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../routes/index';


chai.use(chaiHttp);

describe('testing invalid endpoint', () => {
  it('should return no such endpoint', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
});
