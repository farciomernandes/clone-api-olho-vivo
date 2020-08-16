import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStop1597108215322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stops',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
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
    await queryRunner.dropTable('stops');
  }
}
