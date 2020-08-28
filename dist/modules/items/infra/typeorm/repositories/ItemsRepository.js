"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Item = _interopRequireDefault(require("../entities/Item"));

var _Category = _interopRequireDefault(require("../entities/Category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ItemsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Item.default);
  }

  async create({
    name,
    category,
    price,
    weight
  }) {
    const categoryRepository = (0, _typeorm.getRepository)(_Category.default); // Verificar se a categoria já existe
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

    const item = await this.ormRepository.create({
      name,
      category: itemCategory,
      price,
      weight
    });
    await this.ormRepository.save(item);
    return item;
  }

  async findByName(name) {
    const item = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return item;
  }

  async findAll() {
    const items = await this.ormRepository.find();
    return items;
  }

  async findAllById(items) {
    const itemIds = items.map(item => item.id);
    const existentItems = await this.ormRepository.find({
      where: {
        id: (0, _typeorm.In)(itemIds)
      }
    });
    return existentItems;
  }

  async findAllItems(category_id) {
    const itemIds = category_id.map(item => item.category_id);
    const existentItems = await this.ormRepository.find({
      where: {
        category_id: (0, _typeorm.In)(itemIds)
      }
    });
    return existentItems;
  }

}

var _default = ItemsRepository;
exports.default = _default;