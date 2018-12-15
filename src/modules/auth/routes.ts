import * as passport from 'passport';
import { Router } from 'express';
import { AuthController } from './controllers/auth-controller';

export default class AuthRoutes {
  public routes : Router;
  private authController: AuthController;

  constructor() {
    this.setUpControllers();
    this.routes = Router();
    this.configRoutes();
  }

  private setUpControllers() : void {
    this.authController = new AuthController();
  }

  private configRoutes() : void {
    this.routes.get('/', this.authController.getUserWithEmail);
    this.routes.get('/email', passport.authenticate('jwt', { session: false }) , this.authController.getEmailWithId);
    this.routes.post('/register', this.authController.registerUser);
    this.routes.post('/login', passport.authenticate('local', { session: false }), this.authController.loginUser);
  }
}
