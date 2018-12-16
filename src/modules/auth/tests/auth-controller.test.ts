import app from '../../../app';
import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import 'mocha';
import * as chai from 'chai';
import { expect } from 'chai';
import chaiHttp = require('chai-http');
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user-repository';

import { LoginParams, LoginResponse, RegisterParams, RegisterResponse } from '../interfaces';
import { User } from '../entities/user';

chai.use(chaiHttp);

const seedUser : RegisterParams = {
  email:'testing@gmail.com',
  password: 'password'
};

describe('Auth Routes', () => {
  beforeEach(async () => { // reset database
    const userRepo : UserRepository = getCustomRepository(UserRepository, process.env.NODE_ENV);
    await userRepo.clearTable();
    const passwordHash : string = await bcrypt.hash(seedUser.password, 10);
    const testUser : User = await userRepo.createAndSave(seedUser.email, passwordHash);
  });

  describe('POST Login', () => {
    const requestUrl : string = '/auth/login';

    const loginParams : LoginParams = {
      email: seedUser.email,
      password: seedUser.password
    }

    it('Success', (done) => {
      chai.request(app).post(requestUrl)
        .send(loginParams)
        .end((err, res) => {
          try {
            const apiResponse : LoginResponse = res.body;
            expect(res).status(200);
            expect(apiResponse.message).to.eql('Login Success!');
            expect(apiResponse.token).to.be.a('string');
            done();
          } catch  (e) {
            done(e);
          }
        });
    })

    it('Invalid password', (done) => {
      const invalidParams : LoginParams = _.assign(loginParams, { password: 'pass' });
      chai.request(app).post(requestUrl)
        .send(invalidParams)
        .end((err, res) => {
          try {
            expect(res).status(401);
            expect(res.text).to.eql('Unauthorized')
            const apiResponse : LoginParams = res.body;
            expect(apiResponse).to.be.empty;
            done();
          } catch  (e) {
            done(e);
          }
        });
    })

    it('Invalid email', (done) => {
      const invalidParams : LoginParams = _.assign(loginParams, { email: 'idonotexist@gmail.com' });
      chai.request(app).post(requestUrl)
        .send(invalidParams)
        .end((err, res) => {
          try {
            expect(res).status(401);
            expect(res.text).to.eql('Unauthorized')
            const apiResponse : LoginParams = res.body;
            expect(apiResponse).to.be.empty;
            done();
          } catch  (e) {
            done(e);
          }
        });
    })
  })

  describe('POST Register', () => {
    const requestUrl : string = '/auth/register';
    const registerParams : RegisterParams = {
      email: 'testuser@gmail.com',
      password: 'password'
    };

    it('Success', (done) => {
      chai.request(app).post(requestUrl)
        .send(registerParams)
        .end(async (err, res) => {
          try {
            expect(res).status(200);
            const apiResponse : RegisterResponse = res.body;
            expect(apiResponse.email).to.be.eql(registerParams.email);
            expect(apiResponse).to.have.property('id');
            expect(apiResponse).to.not.have.property('password');
            const userRepo = getCustomRepository(UserRepository, process.env.NODE_ENV);
            const userCount = await userRepo.numberOfEntries();
            expect(userCount).to.be.eql(2); // User should be added to DB
            done();
          } catch (e) {
            done(e);
          }
        });
    });

    it('Duplicate Entries', (done) => {
      chai.request(app).post(requestUrl)
        .send(seedUser)
        .end(async (err, res) => {
          try {
            expect(res).status(401);
            expect(res.text).to.eql('User already exists');
            const userRepo : UserRepository = getCustomRepository(UserRepository, process.env.NODE_ENV);
            const count : number = await userRepo.numberOfEntries();
            expect(count).to.be.eql(1); // User should not be added to DB
            done();
          } catch (e) {
            done(e);
          }
        });
    });
  })
})