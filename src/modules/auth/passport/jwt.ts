import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { StrategyOptions } from 'passport-jwt';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';

interface JWTPayload {
  userId: number,
}

const opts : StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new JwtStrategy(opts, 
  async (payload: JWTPayload, done) => {
    const userRepository : UserRepository = getCustomRepository(UserRepository);
    try {
      const user : User = await userRepository.findById(payload.userId);
      if(!user) return done(null, false);
      return done(null, user.id);
    } catch(e) {
      console.log(e);
      return done(e);
    }
  }
);

export default jwtStrategy;