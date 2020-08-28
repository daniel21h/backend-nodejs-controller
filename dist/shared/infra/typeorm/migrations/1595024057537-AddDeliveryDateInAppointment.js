"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddDeliveryDateInAppointment1595024057537 {
  async up(queryRunner) {
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'delivery_date',
      type: 'timestamp with time zone'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('appointments', 'delivery_date');
  }

}

exports.default = AddDeliveryDateInAppointment1595024057537;