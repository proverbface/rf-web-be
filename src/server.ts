require('module-alias/register');
import App from './app';
import ItemController from './controller/item.controller';
import ItemRepository from './repository/item.repository';
import loggerMiddleware from './middleware/logger';
import corsMiddleware from './middleware/crosMiddleware';
import { settings } from './settings';

const port = parseInt(String(settings.port));

const itemRepository = new ItemRepository();

export const app = new App({
  prefix: settings.prefix,
  port,
  controllers: [
    new ItemController(itemRepository),
  ],
  middleWares: [loggerMiddleware, corsMiddleware],
});

app
  .listen()
  .then(server => {
    console.log(`App listening on port ${port}`);
    // handle shutdown
    const signals = { SIGHUP: 1, SIGINT: 2, SIGTERM: 15 };
    Object.keys(signals).forEach(signal => {
      process.on(<any>signal, () => {
        shutdown(signal, signals[signal]);
      });
    });

    function shutdown(signal, value) {
      console.log(`Starting shutdown from signal: ${signal}`);
      server.close(() => {
        console.log(`Server stopped by ${signal} with value ${value}`);
        process.exit(128 + value);
      });
    }
  })
  .catch(err => {
    console.error(err);
  });
