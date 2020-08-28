"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Item = _interopRequireDefault(require("../entities/Item"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListItemsRepository = (_dec = (0, _typeorm.EntityRepository)(_Item.default), _dec(_class = class ListItemsRepository extends _typeorm.Repository {
  async getBalance() {
    const items = await this.find();
    return items;
  }

}) || _class);
var _default = ListItemsRepository;
exports.default = _default;