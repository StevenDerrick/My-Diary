import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import {
  STATUS_CODE_OK,
  BAD_REQUEST_STATUS_CODE,
  UNPROCESSABLE_ENTITY_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  STATUS_CODE_CREATED,
} from '../../helpers/statusCodeHandler';

chai.use(chaiHttp);

describe('testing sign up ON DATABASE', () => {
  it('should validate user first round', (done) => {
    const newUser = {
      email: 'nkundajoy@gmail.com',
      firstName: 'Yahoo',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST_STATUS_CODE);
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
        expect(res).to.have.status(BAD_REQUEST_STATUS_CODE);
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
        expect(res).to.have.status(BAD_REQUEST_STATUS_CODE);
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
        expect(res).to.have.status(BAD_REQUEST_STATUS_CODE);
      });
    done();
  });
  it('should return User created successfully', (done) => {
    const newUser = {
      email: 'mico@gmail.com',
      password: 'james123',
      firstName: 'james',
      lastName: 'bond',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_CREATED);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should return email already exist', (done) => {
    const newUser = {
      email: 'mico@gmail.com',
      password: 'james123',
      firstName: 'james',
      lastName: 'bond',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(UNPROCESSABLE_ENTITY_STATUS_CODE);
      });
    done();
  });
  it('should return email already exists on signup', (done) => {
    const regularUser = {
      email: 'mico@gmail.com',
      lastName: 'Yaahoo',
      firstName: 'Yaago',
      password: 'james1223',
    };
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(regularUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(UNPROCESSABLE_ENTITY_STATUS_CODE);
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
      .post('/api/v2/auth/signin')
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(UNAUTHORIZED_STATUS_CODE);
      });
    done();
  });
  it('should return invalid email or password when password is incorrect', (done) => {
    const invalidCredentials = {
      email: 'mico@gmail.com',
      password: 'jieojf',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(UNAUTHORIZED_STATUS_CODE);
      });
    done();
  });
  it('should return User is successfully logged in', (done) => {
    const user = {
      email: 'mico@gmail.com',
      password: 'james123',
    };
    chai.request(app)
      .post('/api/v2/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
