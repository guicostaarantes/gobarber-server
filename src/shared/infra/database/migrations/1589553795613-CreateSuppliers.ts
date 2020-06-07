import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateSuppliers1589553795613
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'suppliers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'real',
          },
          {
            name: 'longitude',
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
        name: 'supplier_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'suppliers',
      new TableForeignKey({
        name: 'user_has_supplier',
        referencedTableName: 'users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'supplier_has_appointments',
        referencedTableName: 'suppliers',
        columnNames: ['supplier_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments',
      'supplier_has_appointments',
    );
    await queryRunner.dropForeignKey('suppliers', 'user_has_supplier');
    await queryRunner.dropColumn('appointments', 'supplier_id');
    await queryRunner.dropTable('suppliers');
  }
}
