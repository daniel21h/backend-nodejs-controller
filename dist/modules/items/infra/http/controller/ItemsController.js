"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateItemService = _interopRequireDefault(require("../../../services/CreateItemService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ListItemsService from '@modules/items/services/ListItemsService';
// import ListItemsByCategoryService from '@modules/items/services/ListItemsByCategoryService';
class ItemsController {
  async create(request, response) {
    const {
      name,
      category,
      price,
      weight
    } = request.body;

    const createItem = _tsyringe.container.resolve(_CreateItemService.default);

    const item = await createItem.execute({
      name,
      category,
      price,
      weight
    });
    return response.json(item);
  } // public async index(request: Request, response: Response): Promise<Response> {
  //   // Retrieve user logged in to appointment
  //   const { category_id } = request.body;
  //   // const { id } = request.params;
  //   const listItemsRepository = container.resolve(ListItemsService);
  //   // const listUserOrders = container.resolve(ListUserOrdersService);
  //   const items = await listItemsRepository.execute({
  //     category_id: String(category_id),
  //   });
  //   // const order = await listUserOrders.execute({
  //   //   id,
  //   // });
  //   // Retornando a resposta ao usuário
  //   return response.json(items);
  // }


}

exports.default = ItemsController;