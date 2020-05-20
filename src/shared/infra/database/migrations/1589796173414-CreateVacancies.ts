import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateVacancies1589796173414
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vacancies',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone',
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vacancies');
  }
}
