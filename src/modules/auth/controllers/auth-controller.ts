import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';

export default class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public getUserWithEmail = async (req: Request, res: Response) : Promise<void> => {
    const { email } = req.body;
    try {
      const user = await this.userRepository.findByEmail(email);
      res.status(200).send(user);
    } catch(e) {
      console.log(e);
      res.status(500).send('Server Error');
    }
  }

  public loginUser = async (req: Request, res: Response) : Promise<void|Response> => {
    const { user } = req;

    if (!user) return res.status(401).send('Invalid Email or Password');

    return res.status(200).send({message: 'Login Success!'});
  }

  public registerUser = async (req: Request, res: Response) : Promise<void> => {
    const { email, password } = req.body;
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await this.userRepository.createAndSave(email, passwordHash);
      res.status(200).send(user);
    } catch(e) {
      console.log(e);
      switch (e.code) {
        case 'ER_DUP_ENTRY':
          res.status(401).send({message: 'User already exists'});
          break;
        default:
          res.status(500).send({message: 'Server Error'});
      }
    }
  }
}

