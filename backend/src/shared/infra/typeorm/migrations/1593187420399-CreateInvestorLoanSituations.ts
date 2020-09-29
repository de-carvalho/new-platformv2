import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateInvestorLoanSituations1593187420399
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'supporter_loan_situations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'projectName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountInvested',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountReceived',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountCorrected',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountInterest',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'installmentPayed',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'totalInstallments',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'refundStatus',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'receivedData',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'projectId',
            type: 'int',
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
        foreignKeys: [
          {
            name: 'SupporterProvider',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('supporter_loan_situations');
  }
}
