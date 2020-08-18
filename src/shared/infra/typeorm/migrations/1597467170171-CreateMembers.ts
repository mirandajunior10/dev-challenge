import {
  MigrationInterface,
  Table,
  QueryRunner,
  TableForeignKey,
} from 'typeorm';

export class CreateMembers1597467170171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'members',
        columns: [
          {
            name: 'member_code',
            type: 'serial',
            isPrimary: true,
          },
          { name: 'pin_code', type: 'varchar', isUnique: true },
          { name: 'employer_code', type: 'uuid' },
          { name: 'employee_cpf', type: 'varchar', isUnique: true },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'members',
      new TableForeignKey({
        name: 'employer_code_FK',
        columnNames: ['employer_code'],
        referencedColumnNames: ['employer_code'],
        referencedTableName: 'employers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'members',
      new TableForeignKey({
        name: 'employee_CPF_FK',
        columnNames: ['employee_cpf'],
        referencedColumnNames: ['CPF'],
        referencedTableName: 'employees',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('members');
  }
}
