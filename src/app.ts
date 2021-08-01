import express, { Application } from 'express';
import { Server } from 'http';
import Controller from '@/controller/controller';

class App {
  public app: Application;
  public port: number;
  public prefix: string;

  constructor(appInit: { prefix: string, port: number; middleWares: any; controllers: Controller[] }) {
    this.app = express();
    this.port = appInit.port;
    this.prefix = appInit.prefix;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare);
    });
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(controllers: Controller[] ) {
    controllers.forEach(controller => {
      this.app.use(this.prefix, controller.router);
    });
  }

  private assets() {
    this.app.use(express.static('public'));
    this.app.use(express.static('views'));
  }

  private template() {
    this.app.set('view engine', 'pug');
  }

  public async listen(): Promise<Server> {
    return new Promise((resolve) => {
      const server = this.app.listen(this.port, () => {
        resolve(server);
      });
    });
  }
}

export default App;
