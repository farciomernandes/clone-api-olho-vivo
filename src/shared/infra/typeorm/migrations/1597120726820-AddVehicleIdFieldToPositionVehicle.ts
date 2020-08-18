import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddVehicleIdFieldToPositionVehicle1597120726820
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vehiclePosition',
      new TableColumn({
        name: 'vehicle_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'vehiclePosition',
      new TableForeignKey({
        name: 'VehiclePosition',
        columnNames: ['vehicle_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vehiclePosition', 'VehiclePosition');

    await queryRunner.dropColumn('vehiclePosition', 'vehicle_id');
  }
}
