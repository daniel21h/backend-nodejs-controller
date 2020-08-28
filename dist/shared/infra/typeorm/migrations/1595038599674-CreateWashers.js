"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateWashers1595038599674 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'washers',
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
        name: 'cpf',
        type: 'numeric'
      }, {
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'phone',
        type: 'numeric'
      }, {
        name: 'machine_size',
        type: 'int'
      }, {
        name: 'address_street',
        type: 'varchar'
      }, {
        name: 'address_number',
        type: 'varchar'
      }, {
        name: 'cep',
        type: 'numeric'
      }, {
        name: 'ironing',
        type: 'varchar'
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
    await queryRunner.dropTable('washers');
  }

}

exports.default = CreateWashers1595038599674;