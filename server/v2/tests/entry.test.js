import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../app';

chai.use(chaiHttp);

dotenv.config();

const User1Token = process.env.USER1_TOKEN;

describe('Testing user creating an entry', () => {
  it('should return created first entry successfully', (done) => {
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
