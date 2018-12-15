import { Application, Request, Response } from 'express';

import AuthRoutes from './modules/auth/routes';

export default class Router {
  private authRoutes : AuthRoutes;

  constructor() {
    this.authRoutes = new AuthRoutes();
  }
  public setupRoutes(app : Application): void {
    app.get('/', (req, res) => {
      res.send('hello');
    });
    app.use('/auth', this.authRoutes.routes);
  }

}