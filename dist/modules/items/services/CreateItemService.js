"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Item = _interopRequireDefault(require("../infra/typeorm/entities/Item"));

var _Category = _interopRequireDefault(require("../infra/typeorm/entities/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
class CreateItemService {
  async execute({
    name,
    category,
    price,
    weight
  }) {
    const itemRepository = (0, _typeorm.getRepository)(_Item.default);
    const categoryRepository = (0, _typeorm.getRepository)(_Category.default); // const { total } = await transactionsRepository.getBalance();
    // if (type === 'outcome' && total < value) {
    //   throw new AppError('You do not have enough balance');
    // }
    // Verificar se a categoria já existe
    // Existe? Buscar ela no DB e o usar o ID que foi retornado

    let itemCategory = await categoryRepository.findOne({
      where: {
        title: category
      }
    });

    if (!itemCategory) {
      // Não existe? Crio ela
      itemCategory = categoryRepository.create({
        title: category
      });
      await categoryRepository.save(itemCategory);
    }

    const item = itemRepository.create({
      name,
      category: itemCategory,
      price,
      weight
    });
    await itemRepository.save(item);
    return item;
  }

}

var _default = CreateItemService;
exports.default = _default;