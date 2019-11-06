import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

chai.use(chaiHttp);

dotenv.config();

const User1Token = process.env.USER1_TOKEN;
const User2Token = process.env.USER2_TOKEN;
const User3Token = process.env.USER3_TOKEN;
const User4Token = process.env.USER4_TOKEN;

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
        expect(res).to.have.status(200);
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
      .set('Authorization', User3Token)
      .send(modifiedEntry)
      .end((err, res) => {
        expect(res).to.have.status(404);
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
        expect(res).to.have.status(404);
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
        expect(res).to.have.status(200);
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
        expect(res).to.have.status(200);
      });
    done();
  });
});

describe('Testing user view all entries ON DATABASE', () => {
  it('should return you do not have an entry ON DATABASE', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('Authorization', User3Token)
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
    done();
  });
  it('should return a list of all entries ON DATABASE', (done) => {
    chai.request(app)
      .get('/api/v2/entries')
      .set('Authorization', User4Token)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });
});
