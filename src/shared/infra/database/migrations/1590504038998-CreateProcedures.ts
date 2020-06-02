import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class CreateProcedures1590504038998
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'procedures',
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'duration',
            type: 'integer',
          },
          {
            name: 'price',
            type: 'real',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'procedure_id',
        type: 'uuid',
      }),
    );
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'price',
        type: 'real',
      }),
    );
    await queryRunner.createForeignKey(
      'procedures',
      new TableForeignKey({
        name: 'supplier_has_procedures',
        referencedTableName: 'suppliers',
        columnNames: ['supplier_id'],
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'procedure_has_appointments',
        referencedTableName: 'procedures',
        columnNames: ['procedure_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments',
      'procedure_has_appointments',
    );
    await queryRunner.dropForeignKey('procedures', 'supplier_has_procedures');
    await queryRunner.dropColumn('appointments', 'price');
    await queryRunner.dropColumn('appointments', 'procedure_id');
    await queryRunner.dropTable('procedures');
  }
}
