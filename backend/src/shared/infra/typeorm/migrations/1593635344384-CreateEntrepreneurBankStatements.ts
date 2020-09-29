import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEntrepreneurBankStatements1593635344384
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entrepreneur_bank_statement',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'projectName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'projectId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'amount',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dueDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'installment',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
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
    await queryRunner.dropTable('entrepreneur_bank_statement');
  }
}
