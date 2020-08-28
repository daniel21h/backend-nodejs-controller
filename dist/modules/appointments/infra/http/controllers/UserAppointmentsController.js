"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListUserAppointmentsService = _interopRequireDefault(require("../../../services/ListUserAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ListUserOrdersService from '@modules/appointments/services/ListUserOrdersService';
class UserAppointmentsController {
  async index(request, response) {
    // Retrieve user logged in to appointment
    const user_id = request.user.id; // const { id } = request.params;

    const listUserAppointments = _tsyringe.container.resolve(_ListUserAppointmentsService.default); // const listUserOrders = container.resolve(ListUserOrdersService);


    const appointments = await listUserAppointments.execute({
      user_id
    }); // const order = await listUserOrders.execute({
    //   id,
    // });
    // Retornando a resposta ao usuário

    return response.json(appointments);
  }

}

exports.default = UserAppointmentsController;