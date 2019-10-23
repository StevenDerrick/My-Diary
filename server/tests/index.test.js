import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../routes/index';


chai.use(chaiHttp);

describe('testing welcome API message', () => {
  it('should return welcome message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });
});

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
