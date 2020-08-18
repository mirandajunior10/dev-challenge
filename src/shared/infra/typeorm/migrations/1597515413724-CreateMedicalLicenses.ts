import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  Table,
} from 'typeorm';

export class CreateMedicalLicenses1597515413724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medical_licenses',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'initial_date',
            type: 'timestamp with time zone',
          },
          {
            name: 'final_date',
            type: 'timestamp with time zone',
          },
          { name: 'time', type: 'int' },
          { name: 'employer_code', type: 'uuid' },
          { name: 'member_code', type: 'int' },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'medical_licenses',
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
      'medical_licenses',
      new TableForeignKey({
        name: 'member_code_FK',
        columnNames: ['member_code'],
        referencedColumnNames: ['member_code'],
        referencedTableName: 'members',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medical_licenses');
  }
}
