import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePositionVehicle1597108240828
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehiclePosition',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isUnique: true,
            isPrimary: true,
          },
          {
            name: 'latitude',
            type: 'decimal',
          },
          {
            name: 'longitude',
            type: 'decimal',
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
    await queryRunner.dropTable('vehiclePosition');
  }
}
