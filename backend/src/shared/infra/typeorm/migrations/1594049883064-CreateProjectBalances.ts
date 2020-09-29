import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProjectBalances1594049883064
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_balance',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'projectId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'unavailable',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'future',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'current',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'moipAccountId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_balance');
  }
}
