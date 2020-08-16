import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddColumnLinhaIdFieldToVehicle1597112421276
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('vehicles', 'line_id');
    await queryRunner.addColumn(
      'vehicles',
      new TableColumn({
        name: 'line_id',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'vehicles',
      new TableForeignKey({
        name: 'VehiclesLines',
        columnNames: ['line_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lines',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vehicles', 'VehiclesLines');

    await queryRunner.dropColumn('vehicles', 'line_id');

    await queryRunner.addColumn(
      'vehicles',
      new TableColumn({
        name: 'line_id',
        type: 'varchar',
      }),
    );
  }
}
