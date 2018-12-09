import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import { createConnection, Connection } from 'typeorm';

import Router from './router';
import appPassport from './modules/auth/passport';


class App {
  public app: express.Application;
  private router: Router;

  constructor() {
    this.app = express();
    this.config();
  }

  private async config() {
    this.app.use(morgan('short'));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    try {
      await this.setUpDb();
      this.configPassportAuth();
      this.configRoutes();
    } catch (e) {
      console.log(e);
    }
  }

  private configRoutes() {
    this.router = new Router();
    this.router.setupRoutes(this.app);
  }

  private configPassportAuth() {
    appPassport.configPassports();
  }

  private setUpDb() : Promise<Connection>{
      return createConnection();
  }
}

export default new App().app;