import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEntrepreneurPortfolio1594136816082
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entrepreneur_portfolio',
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
            name: 'userName',
            type: 'varchar',
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
            name: 'partnerId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'requestedAmount',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountCaptured',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'percentageFee',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'signupDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'receiptDate',
            type: 'date',
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
    await queryRunner.dropTable('entrepreneur_portfolio');
  }
}
