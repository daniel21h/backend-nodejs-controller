import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddWhatsappToUsers1598964938881
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'whatsapp',
        type: 'numeric',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'whatsapp');
  }
}
