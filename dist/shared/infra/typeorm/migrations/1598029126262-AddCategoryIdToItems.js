"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddCategoryIdToItems1598029126262 {
  async up(queryRunner) {
    await queryRunner.addColumn('items', new _typeorm.TableColumn({
      name: 'category_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('items', new _typeorm.TableForeignKey({
      columnNames: ['category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'categories',
      name: 'ItemCategory',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('items', 'ItemCategory');
    await queryRunner.dropColumn('items', 'category_id');
  }

}

exports.default = AddCategoryIdToItems1598029126262;