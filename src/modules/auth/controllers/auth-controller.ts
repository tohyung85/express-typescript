import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/user-repository';

export class AuthController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository, process.env.NODE_ENV);
    this.bindMethods();
  }

  private bindMethods () {
    this.getUserWithEmail = this.getUserWithEmail.bind(this);
    this.getEmailWithId = this.getEmailWithId.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  public async getUserWithEmail (req: Request, res: Response) : Promise<Response> {
    const { email } = req.body;
    try {
      const user = await this.userRepository.findByEmail(email);
      return res.status(200).send(user.whiteList());
    } catch(e) {
      console.log(e);
      return res.status(500).send('Server Error');
    }
  }

  public async getEmailWithId (req: Request, res: Response) : Promise<Response> {
    const { user } = req;

    try {
      const userFound = await this.userRepository.findById(user);
      if(!userFound) return res.status(401).send('Bad Request');
      const { email } = userFound;
      res.status(200).send({email});
    } catch (e) {
      console.log(e);
      res.status(500).send('Server Error');
    }
  }

  public async loginUser (req: Request, res: Response) : Promise<void|Response> {
    const { user } = req;

    if (!user) return res.status(401).send('Invalid Email or Password');

    const token : string = jwt.sign({userId: user.id}, process.env.JWT_SECRET)

    return res.status(200).send({message: 'Login Success!', token});
  }

  public async registerUser (req: Request, res: Response) : Promise<void> {
    const { email, password } = req.body;
    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await this.userRepository.createAndSave(email, passwordHash);
      res.status(200).send(user.whiteList());
    } catch(e) {
      switch (e.code) {
        case 'ER_DUP_ENTRY':
          res.status(401).send('User already exists');
          break;
        default:
          console.log(e);
          res.status(500).send('Server Error');
      }
    }
  }
}

