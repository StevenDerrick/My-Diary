import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import {
  STATUS_CODE_OK,
  NOT_FOUND_STATUS_CODE,
  STATUS_CODE_FORBIDDEN,
  STATUS_NO_CONTENT,
  BAD_REQUEST_STATUS_CODE,
} from '../../helpers/statusCodeHandler';

chai.use(chaiHttp);

dotenv.config();

const User1Token = process.env.USER1_TOKEN;
const User2Token = process.env.USER2_TOKEN;
const User3Token = process.env.USER3_TOKEN;
const User4Token = process.env.USER4_TOKEN;
const User5Token = process.env.USER5_TOKEN;

describe('Testing user creating an entry ON DATABASE', () => {
  it('should return created first entry successfully ON DATABASE', (done) => {
    const newEntry = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .post('/api/v2/entries')
      .set('Authorization', User1Token)
      .send(newEntry)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
        expect(res.body).to.have.property('data');
      });
    done();
  });
});

describe('Testing user modify entry ON DATABASE', () => {
  it('should return You do not have an entry yet ON DATABASE', (done) => {
    const modifiedEntry = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .patch('/api/v2/entries/1')
      .set('Authorization', User5Token)
      .send(modifiedEntry)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND_STATUS_CODE);
      });
    done();
  });
  it('should return You do not have an entry with this ID ON DATABASE', (done) => {
    const modifiedEntry = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .patch('/api/v2/entries/9')
      .set('Authorization', User2Token)
      .send(modifiedEntry)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND_STATUS_CODE);
      });
    done();
  });
  it('should return entry successfully edited ON DATABASE', (done) => {
    const modifiedEntry = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .patch('/api/v2/entries/1')
      .set('Authorization', User2Token)
      .send(modifiedEntry)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});

describe('Testing user delete entry ON DATABASE', () => {
  it('should return entry deleted successfully ON DATABASE', (done) => {
    chai.request(app)
      .delete('/api/v2/entries/1')
      .set('Authorization', User2Token)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_NO_CONTENT);
      });
    done();
  });
});

describe('Testing user view all entries ON DATABASE', () => {
  it('should return you do not have an entry ON DATABASE', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('Authorization', User5Token)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND_STATUS_CODE);
      });
    done();
  });
  it('should return a list of all entries ON DATABASE', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('Authorization', User4Token)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});


describe('Testing user view specific entry ON DATABASE', () => {
  it('should return a specific entry ON DATABASE', (done) => {
    chai.request(app)
      .get('/api/v2/entries/3')
      .set('Authorization', User4Token)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});

describe('Testing token validity DATABASE', () => {
  it('should return sorry this token doesnot belong to a valid user ON DATABASE', (done) => {
    chai.request(app)
      .get('/api/v2/entries/3')
      .set('Authorization', User3Token)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_FORBIDDEN);
      });
    done();
  });
});

describe('Testing params validator', () => {
  it('should return entryId must be an integer', (done) => {
    chai.request(app)
      .get('/api/v2/entries/hghg')
      .set('Authorization', User3Token)
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST_STATUS_CODE);
      });
    done();
  });
});
