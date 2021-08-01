import { Router, Request, Response } from 'express';
import Controller from '@/controller/controller';
import {StatusCodes} from 'http-status-codes';
import {CrudRepository} from '@/repository/crud.repository';
import {Item} from '@/repository/types/item.model';
import { logger } from '../common/logger';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../common/exception.constants';
import rateLimit from 'express-rate-limit';
import { shortDateFormat } from '@/common/date';

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Max 1000 every 15 minutes
  message: 'Too many requests from this IP, please try again later'
});

class ItemController implements Controller {
  public router = Router();
  private repository: CrudRepository<Item>;

  constructor(repository: CrudRepository<Item>) {
    this.repository = repository;
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/items/:id', apiRateLimiter, this.getItem);
  }

  getItem = async (request: Request, response: Response) => {
    const id = request.params.id;
    if (!id) {
      response.status(StatusCodes.NOT_FOUND);
      return;
    }

    try {
      let item = await this.repository.get(id);
      if (!item) {
        item = {
          id,
          viewCount: 1,
          date: shortDateFormat(new Date()),
        };
      } else {
        ++item.viewCount;
      }
      await this.repository.save(item);
      response.status(StatusCodes.OK).json(item);
    } catch (error) {
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: MESSAGE_INTERNAL_SERVER_ERROR});
      logger.error(error);
    }
  };
}

export default ItemController;
