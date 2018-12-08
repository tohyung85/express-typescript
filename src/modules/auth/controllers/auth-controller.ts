import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';

export default class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public getUserWithEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
      const user = await this.userRepository.findByEmail(email);
      res.status(200).send(user);
    } catch(e) {
      console.log(e);
      res.status(500).send('Server Error');
    }
  }
}

