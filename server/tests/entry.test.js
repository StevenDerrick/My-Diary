import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

chai.use(chaiHttp);

const UserToken = process.env.USER_TOKEN;


describe('Testing user create new trip', () => {
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
        expect(res).to.have.status(401);
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
        expect(res).to.have.status(400);
      });
    done();
  });
  it('should return entry created successfully', (done) => {
    const newTrip = {
      title: 'Good day',
      description: 'Good day we had yesterday when I spent',
    };
    chai.request(app)
      .post('/api/v1/entries')
      .set('Authorization', UserToken)
      .send(newTrip)
      .end((err, res) => {
        expect(res).to.have.status(200);
      });
    done();
  });
});
