"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IItemsRepository = _interopRequireDefault(require("../repositories/IItemsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListItemsFromCategoryService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ItemsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IItemsRepository.default === "undefined" ? Object : _IItemsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListItemsFromCategoryService {
  constructor(itemsRepository) {
    this.itemsRepository = itemsRepository;
  } // List all service providers except the user who is listing


  async execute({
    category
  }) {
    const appointments = await this.itemsRepository.findByCategoryItems({
      category
    });
    return appointments;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListItemsFromCategoryService;
exports.default = _default;