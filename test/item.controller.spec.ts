import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import App from '../src/app';
import { settings } from '../src/settings';
import ItemController from '../src/controller/item.controller';
import loggerMiddleware from '../src/middleware/logger';
import ItemRepository from '../src/repository/item.repository';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../src/common/exception.constants';

const port = parseInt(String(settings.port));

const repository = new ItemRepository();
jest.spyOn(repository, 'get');
jest.spyOn(repository, 'save');

const app = new App({
  prefix: settings.prefix,
  port,
  controllers: [
    new ItemController(repository),
  ],
  middleWares: [loggerMiddleware],
});

describe('GET /items/:id', () => {
  it('get item with invalid id returns not found', done => {
    supertest(app.app)
      .get('/items/')
      .expect(StatusCodes.NOT_FOUND, done);
  });
  it('get item with valid id returns item', done => {
    (repository.get as jest.Mock).mockResolvedValue({
      id: '123123123',
      viewCount: 1000,
    });
    (repository.save as jest.Mock).mockResolvedValue(undefined);
    supertest(app.app)
      .get('/items/123123123')
      .expect((res) => {
          expect(res.body).toEqual({
            id: '123123123',
            viewCount: 1001,
          });
        })
      .expect(StatusCodes.OK, done);
  });
  it('get item with valid id returns error when database cannot save', done => {
    (repository.get as jest.Mock).mockResolvedValue({
      id: '123123123',
      viewCount: 1000,
    });
    (repository.save as jest.Mock).mockRejectedValue('Database unavailable');
    supertest(app.app)
      .get('/items/123123123')
      .expect((res) => {
        expect(res.body).toEqual({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
      })
      .expect(StatusCodes.INTERNAL_SERVER_ERROR, done);
  });
  it('get item with valid id returns error when database cannot retrieve data', done => {
    (repository.get as jest.Mock).mockRejectedValue('Database unavailable');
    supertest(app.app)
      .get('/items/123123123')
      .expect((res) => {
        expect(res.body).toEqual({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
      })
      .expect(StatusCodes.INTERNAL_SERVER_ERROR, done);
  });
});
