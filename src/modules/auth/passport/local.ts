import * as bcrypt from 'bcrypt';
import * as LocalStrategy from 'passport-local';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
  }, async (email: string, password: string, done) => {
    const userRepository : UserRepository = getCustomRepository(UserRepository);
    try {
      const user: User = await userRepository.findByEmail(email);
      if (!user) return done(null, false);
      const match : boolean = await verifyPassword(password, user.password);
      if(!match) return done(null, false);
      return done(null, user);
    } catch(e) {
      console.log(e);
      done(e);
    }
  }
);

const verifyPassword = (password : string, hash : string) : Promise<boolean> => {
  return bcrypt.compare(password, hash);
}

export default localStrategy;