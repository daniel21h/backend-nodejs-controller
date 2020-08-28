"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _WashersController = _interopRequireDefault(require("../controllers/WashersController"));

var _ListWashersRepository = _interopRequireDefault(require("../../typeorm/repositories/ListWashersRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const washersRouter = (0, _express.Router)();
const washersController = new _WashersController.default();
washersRouter.post('/', washersController.create);
washersRouter.get('/', async (request, response) => {
  const listWashersRepository = (0, _typeorm.getCustomRepository)(_ListWashersRepository.default); // Aguardando retorno dos registros

  const washers = await listWashersRepository.find();
  return response.json(washers);
});
var _default = washersRouter;
exports.default = _default;