"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointment = _interopRequireDefault(require("../entities/Appointment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointment.default);
  }

  async findByDate(date, provider_id) {
    // Encontrar agendamento na mesma data retornando true or false,
    // para não haver agendamentos no mesmo horário
    const findAppointment = await this.ormRepository.findOne({
      // Como se estivesse fazendo um query no DB
      where: {
        date,
        provider_id
      }
    });
    return findAppointment;
  }

  async findById(id) {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_items', 'user']
    });
    return order;
  }

  async findAllFromProvider({
    user_id
  }) {
    const appointments = await this.ormRepository.find({
      where: {
        user_id
      },
      relations: ['order_items', 'user']
    });
    return appointments;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }) {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
      }
    });
    return appointments;
  }

  async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }) {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: (0, _typeorm.Raw)(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`)
      },
      relations: ['user']
    });
    return appointments;
  } // Cria usuário e salva no DB


  async create({
    provider_id,
    user_id,
    date,
    delivery_date,
    items
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
      delivery_date,
      order_items: items
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;