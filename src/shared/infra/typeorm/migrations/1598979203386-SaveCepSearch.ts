import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class SaveCepSearch1598979203386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'save_cep_search',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cep',
            type: 'numeric',
          },
          {
            name: 'address',
            type: 'varchar',
          },

          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'location',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('save_cep_search');
  }
}
