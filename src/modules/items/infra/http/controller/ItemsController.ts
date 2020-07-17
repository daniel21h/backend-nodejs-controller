import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateItemService from '@modules/products/services/CreateItemService';

export default class ItemsController {
  public async create(request: Request, response: Response): Promise<void> {
    // TODO
  }
}
