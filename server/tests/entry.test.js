import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';
import {
  UNAUTHORIZED_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  STATUS_CODE_OK,
  NOT_FOUND_STATUS_CODE,
} from '../helpers/statusCodeHandler';

dotenv.config();

chai.use(chaiHttp);

const UserToken = process.env.USER_TOKEN;
const User1Token = process.env.USER1_TOKEN;
const User2Token = process.env.USER2_TOKEN;


describe('Testing user create new entry', () => {
  it('should return forbidden you must login to proceed', (done) => {
    const newTrip = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', '')
      .send(newTrip)
      .end((err, res) => {
        expect(res).to.have.status(UNAUTHORIZED_STATUS_CODE);
      });
    done();
  });
  it('should validate the entry round 1', (done) => {
    const newTrip = {
      title: 'Good day',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', UserToken)
      .send(newTrip)
      .end((err, res) => {
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should validate the entry round 2', (done) => {
    const newTrip = {
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', UserToken)
      .send(newTrip)
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST_STATUS_CODE);
      });
    done();
  });
  it('should return You do not have entries yet', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/2')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });
  it('should return entry created first entry successfully', (done) => {
    const newTrip = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', UserToken)
      .send(newTrip)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
  it('should return entry created second entry successfully', (done) => {
    const newTrip = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', UserToken)
      .send(newTrip)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});

describe('Testing user modify entry', () => {
  it('should return You do not have an entry yet', (done) => {
    const modifiedEntry = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .patch('/api/v1/entries/1')
      .set('Authorization', UserToken)
      .send(modifiedEntry)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND_STATUS_CODE);
      });
    done();
  });
  it('should return You do not have an entry with this ID', (done) => {
    const modifiedEntry = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .patch('/api/v1/entries/2')
      .set('Authorization', User1Token)
      .send(modifiedEntry)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND_STATUS_CODE);
      });
    done();
  });
  it('should return entry successfully edited', (done) => {
    const modifiedEntry = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .patch('/api/v1/entries/1')
      .set('Authorization', User1Token)
      .send(modifiedEntry)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});

describe('Testing user delete entry', () => {
  it('should return entry deleted successfully', (done) => {
    chai.request(app)
      .delete('/api/v1/entries/1')
      .set('Authorization', User1Token)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});

describe('Testing user view all entries', () => {
  it('should return you do not have an entry', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Authorization', User2Token)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND_STATUS_CODE);
      });
    done();
  });
  it('should return a list of all entries', (done) => {
    chai.request(app)
      .get('/api/v1/entries')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});


describe('Testing user view specific entry', () => {
  it('should return a specific entry', (done) => {
    chai.request(app)
      .get('/api/v1/entries/2')
      .set('Authorization', UserToken)
      .end((err, res) => {
        expect(res).to.have.status(STATUS_CODE_OK);
      });
    done();
  });
});
