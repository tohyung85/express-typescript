import * as passport from 'passport';
import localStrategy from './local';

class Passport {
  public configPassports = () : void => {
    passport.use(localStrategy);
  }
}

export default new Passport();