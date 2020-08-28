"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateOrdersItems1594992640809 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders_items',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2
      }, {
        name: 'quantity',
        type: 'int'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('orders_items');
  }

}

exports.default = CreateOrdersItems1594992640809;