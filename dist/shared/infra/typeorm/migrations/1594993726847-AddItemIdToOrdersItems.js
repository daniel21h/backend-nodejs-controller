"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddItemIdToOrdersItems1594993726847 {
  async up(queryRunner) {
    await queryRunner.addColumn('orders_items', new _typeorm.TableColumn({
      name: 'item_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('orders_items', new _typeorm.TableForeignKey({
      name: 'OrdersItemsItem',
      columnNames: ['item_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'items',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('orders_items', 'OrdersItemsItem');
    await queryRunner.dropColumn('orders_items', 'item_id');
  }

}

exports.default = AddItemIdToOrdersItems1594993726847;