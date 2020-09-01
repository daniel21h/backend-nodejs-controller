import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import Item from '../infra/typeorm/entities/Item';
import IItemsRepository from '../repositories/IItemsRepository';

interface IRequest {
  category: string;
}

@injectable()
class ListItemsFromCategoryService {
  constructor(
    @inject('ItemsRepository')
    private itemsRepository: IItemsRepository,
  ) {}

  // List all service providers except the user who is listing
  public async execute({ category }: IRequest): Promise<Item[]> {
    const search = await this.itemsRepository.findByCategory(category);

    return search;
  }
}

export default ListItemsFromCategoryService;
