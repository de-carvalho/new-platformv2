import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRefundPayments1592509669207
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'refund_payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'amount',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paymentDate',
            type: 'date',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'projectId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'reimburserId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'purpose',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'totalPayees',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'installments',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'moipId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'moipOrderId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'boletoLink',
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
        foreignKeys: [
          {
            name: 'RefundPaymentProvider',
            columnNames: ['reimburserId'],
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
    await queryRunner.dropTable('refund_payments');
  }
}
