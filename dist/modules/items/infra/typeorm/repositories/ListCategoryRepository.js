"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Item = _interopRequireDefault(require("../entities/Item"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListCategoryRepository = (_dec = (0, _typeorm.EntityRepository)(_Item.default), _dec(_class = class ListCategoryRepository extends _typeorm.Repository {
  async getCategory() {
    const categories = await this.find({
      where: {
        category_id: "c3ebe5ba-1488-437f-8b69-294992916d48"
      }
    });
    return categories;
  }

}) || _class);
var _default = ListCategoryRepository;
exports.default = _default;