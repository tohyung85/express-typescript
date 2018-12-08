import { Application, Request, Response } from 'express';

import AuthRoutes from './modules/auth/routes';

export default class Router {
  private authRoutes : AuthRoutes;

  constructor() {
    this.authRoutes = new AuthRoutes();
  }
  public setupRoutes(app : Application): void {
    app.route('/')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'GET request success!'
        });
      });

    app.use('/auth', this.authRoutes.routes);
  }

}