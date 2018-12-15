import '../dotenv-config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { getConnectionOptions, createConnection, Connection } from 'typeorm';

import Router from './router';
import appPassport from './modules/auth/passport';

class App {
  public app: express.Application;
  private router: Router;

  constructor() {
    this.app = express();
    this.config();
  }

  private async config() : Promise<void> {
    this.app.use(morgan('short'));

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());

    try {
      await this.setUpDb();
      this.configPassportAuth();
      this.configRoutes();
    } catch (e) {
      console.log(e);
    }
  }

  private configRoutes() : void {
    this.router = new Router();
    this.router.setupRoutes(this.app);
  }

  private configPassportAuth() : void {
    appPassport.configPassports();
  }

  private async setUpDb() : Promise<Connection>{
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection(connectionOptions);
  }
}

export default new App().app;