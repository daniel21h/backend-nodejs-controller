"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _ItemsController = _interopRequireDefault(require("../controller/ItemsController"));

var _ListItemsRepository = _interopRequireDefault(require("../../typeorm/repositories/ListItemsRepository"));

var _ListCategoryRepository = _interopRequireDefault(require("../../typeorm/repositories/ListCategoryRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const itemsRouter = (0, _express.Router)();
const itemsRouterCreate = (0, _express.Router)();
const itemsController = new _ItemsController.default();
itemsRouterCreate.post('/', itemsController.create);
itemsRouter.get('/', async (request, response) => {
  const listItemsRepository = (0, _typeorm.getCustomRepository)(_ListItemsRepository.default); // Aguardando retorno dos registros

  const items = await listItemsRepository.find();
  return response.json(items);
});
itemsRouter.get('/c', async (request, response) => {
  const listCategoryRepository = (0, _typeorm.getCustomRepository)(_ListCategoryRepository.default); // Aguardando retorno dos registros

  const categories = await listCategoryRepository.find();
  return response.json(categories);
}); // itemsRouter.get('/category', itemsController.index);

var _default = [itemsRouter, itemsRouterCreate];
exports.default = _default;