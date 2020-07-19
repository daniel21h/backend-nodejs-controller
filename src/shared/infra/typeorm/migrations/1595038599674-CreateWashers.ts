import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateWashers1595038599674 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'washers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'numeric',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'numeric',
          },
          {
            name: 'machine_size',
            type: 'int',
          },
          {
            name: 'address_street',
            type: 'varchar',
          },
          {
            name: 'address_number',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'numeric',
          },
          {
            name: 'ironing',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('washers');
  }
}
