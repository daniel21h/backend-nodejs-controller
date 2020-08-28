"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateItems1594990937545 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'items',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2
      }, {
        name: 'weight',
        type: 'decimal',
        precision: 10,
        scale: 3
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
    await queryRunner.dropTable('items');
  }

}

exports.default = CreateItems1594990937545;