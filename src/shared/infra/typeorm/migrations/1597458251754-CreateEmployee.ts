import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class CreateEmployee1597458251754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
        columns: [
          {
            name: 'CPF',
            type: 'varchar',
            isPrimary: true,
          },
          { name: 'name', type: 'varchar' },
          { name: 'father', type: 'varchar' },
          { name: 'mother', type: 'varchar' },
          { name: 'hand', type: 'boolean' },
          {
            name: 'birthday',
            type: 'timestamp with time zone',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}
