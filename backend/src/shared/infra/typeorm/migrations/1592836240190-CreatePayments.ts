import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePayments1592836240190 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_payments',
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
            name: 'payorId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'payeeId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'purpose',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'moipId',
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
            name: 'PaymentProvider',
            columnNames: ['payorId'],
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
    await queryRunner.dropTable('project_payments');
  }
}
