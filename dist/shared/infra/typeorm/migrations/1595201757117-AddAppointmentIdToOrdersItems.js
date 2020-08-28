"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddAppointmentIdToOrdersItems1595201757117 {
  async up(queryRunner) {
    await queryRunner.addColumn('orders_items', new _typeorm.TableColumn({
      name: 'appointment_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('orders_items', new _typeorm.TableForeignKey({
      name: 'OrdersItemsAppointment',
      columnNames: ['appointment_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'appointments',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('orders_items', 'OrdersItemsAppointment');
    await queryRunner.dropColumn('orders_items', 'appointment_id');
  }

}

exports.default = AddAppointmentIdToOrdersItems1595201757117;