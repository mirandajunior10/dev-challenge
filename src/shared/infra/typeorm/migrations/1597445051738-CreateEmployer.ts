import { MigrationInterface, Table, QueryRunner } from 'typeorm';

export class CreateEmployer1597445051738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employers',
        columns: [
          {
            name: 'employer_code',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          { name: 'password', type: 'varchar' },
          { name: 'employer_name', type: 'varchar' },
          { name: 'member_count', type: 'int' },
          { name: 'thumbnail', type: 'varchar' },
          {
            name: 'register_date',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employers');
  }
}
