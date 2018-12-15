import '../../../../dotenv-config';
import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp = require('chai-http');
import app from '../../../app';

chai.use(chaiHttp);

const loginParams = {
  email: 'joshuatest@gmail.com',
  password: 'password1'
}

describe('Auth Routes', () => {
  it('LOGIN', (done) => {
    chai.request(app).post('/auth/login')
      .send(loginParams)
      .end((err, res) => {
        try {
          expect(res.body.message).to.eql('Login Success!');
          done();
        } catch  (e) {
          done(e);
        }
      });
  })
})