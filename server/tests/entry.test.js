import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../server';

dotenv.config();

chai.use(chaiHttp);

const UserToken = process.env.USER_TOKEN;
const User1Token = process.env.USER1_TOKEN;


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

describe('Testing user modify entry trip', () => {
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
        expect(res).to.have.status(400);
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
        expect(res).to.have.status(400);
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
        expect(res).to.have.status(200);
      });
    done();
  });
  // it('should validate the entry round 1', (done) => {
  //   const newTrip = {
  //     title: 'Good day',
  //   };
  //   chai.request(app)
  //     .post('/api/v1/entries')
  //     .set('Authorization', UserToken)
  //     .send(newTrip)
  //     .end((err, res) => {
  //       expect(res).to.have.status(400);
  //     });
  //   done();
  // });
  // it('should validate the entry round 2', (done) => {
  //   const newTrip = {
  //     description: 'Good day we had yesterday when I spent',
  //   };
  //   chai.request(app)
  //     .post('/api/v1/entries')
  //     .set('Authorization', UserToken)
  //     .send(newTrip)
  //     .end((err, res) => {
  //       expect(res).to.have.status(400);
  //     });
  //   done();
  // });
  // it('should return entry created successfully', (done) => {
  //   const newTrip = {
  //     title: 'Good day',
  //     description: 'Good day we had yesterday when I spent',
  //   };
  //   chai.request(app)
  //     .post('/api/v1/entries')
  //     .set('Authorization', UserToken)
  //     .send(newTrip)
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //     });
  //   done();
  // });
});