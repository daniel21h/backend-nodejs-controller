import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDeliveryDateInAppointment1595024057537
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'delivery_date',
        type: 'timestamp with time zone',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'delivery_date');
  }
}
