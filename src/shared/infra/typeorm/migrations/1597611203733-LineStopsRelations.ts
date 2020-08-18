import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export default class LineStopsRelations1597611203733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'lines_stops',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isUnique: true,
              isPrimary: true,
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
          ]
        })
      );

      await queryRunner.addColumn(
        'lines_stops',
        new TableColumn({
          name: 'line_id',
          type: 'varchar',
          isNullable: true,
        })
      )

      await queryRunner.createForeignKey(
        'lines_stops',
        new TableForeignKey({
          name:'LineIdRelation',
          columnNames: ['line_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'lines',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        })
      )

      await queryRunner.addColumn(
        'lines_stops',
        new TableColumn({
          name: 'stop_id',
          type: 'varchar',
          isNullable: true,
        })
      )

      await queryRunner.createForeignKey(
        'lines_stops',
        new TableForeignKey({
          name:'StopIdRelation',
          columnNames: ['stop_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'stops',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('lines_stops', 'StopIdRelation');

      await queryRunner.dropColumn('lines_stops', 'stop_id');

      await queryRunner.dropForeignKey('lines_stops', 'LineIdRelation');

      await queryRunner.dropColumn('lines_stops', 'line_id');

    }

}
