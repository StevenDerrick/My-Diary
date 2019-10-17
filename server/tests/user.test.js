import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

describe('testing sign up', () => {
  it('should validate user first round', (done) => {
    const newUser = {
      email: 'nkundajoy@gmail.com',
      firstName: 'Yahoo',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
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
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should return email already exist', (done) => {
    const newUser = {
      email: 'john@gmail.com',
      password: 'james123',
      firstName: 'james',
      lastName: 'bond',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(422);
      });
    done();
  });
});


describe('Testing sign in', () => {
  it('should return invalid email or password when user entered email with no existing account', (done) => {
    const invalidCredentials = {
      email: 'invalid@gmail.com',
      password: 'jieojf',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });
  it('should return invalid email or password when password is incorrect', (done) => {
    const invalidCredentials = {
      email: 'john@gmail.com',
      password: 'jieojf',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });
  it('should return User is successfully logged in', (done) => {
    const user = {
      email: 'jane@gmail.com',
      password: 'jane123',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
