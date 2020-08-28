"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentService = _interopRequireDefault(require("../../../services/CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async create(request, response) {
    // Retrieve user logged in to appointment
    const user_id = request.user.id;
    const {
      provider_id,
      date,
      delivery_date,
      items
    } = request.body;

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentService.default);

    const appointment = await createAppointment.execute({
      date,
      delivery_date,
      provider_id,
      user_id,
      items
    }); // Retornando a resposta ao usuário

    return response.json(appointment);
  }

}

exports.default = AppointmentsController;