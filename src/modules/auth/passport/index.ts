import * as passport from 'passport';
import localStrategy from './local';
import jwtStrategy from './jwt';

class Passport {
  public configPassports = () : void => {
    passport.use(localStrategy);
    passport.use(jwtStrategy);
  }
}

export default new Passport();