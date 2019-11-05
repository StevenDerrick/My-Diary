import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('testing sign up', () => {
  it('should validate user first round', (done) => {
    const newUser = {
      email: 'nkundajoy@gmail.com',
      firstName: 'Yahoo',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should validate user second round', (done) => {
    const newUser = {
      email: 'nkundajoy@gmail.com',
      lastName: 'Yahoo',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should validate user third round', (done) => {
    const newUser = {
      email: 'nkundajoy@gmail.com',
      lastName: 'Yahoo',
      firstName: 'Yago',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return validate the user round four', (done) => {
    const newUser = {
      password: 'james123',
      firstName: 'james',
      lastName: 'bond',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return User created successfully', (done) => {
    const newUser = {
      email: 'james@gmail.com',
      password: 'james123',
      firstName: 'james',
      lastName: 'bond',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should return email already exist', (done) => {
    const newUser = {
      email: 'james@gmail.com',
      password: 'james123',
      firstName: 'james',
      lastName: 'bond',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(422);
      });
    done();
  });
  it('should return email already exists on signup', (done) => {
    const regularUser = {
      email: 'steven@gmail.com',
      lastName: 'Yaahoo',
      firstName: 'Yaago',
      password: 'james1223',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(regularUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
      });
    done();
  });
});
