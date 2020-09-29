import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateWithdrawMoney1598886777105
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'withdraw',
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
          },
          {
            name: 'issueDateTime',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'amount',
            type: 'varchar',
          },
          {
            name: 'bankNumber',
            type: 'varchar',
          },
          {
            name: 'bankAccountNumber',
            type: 'varchar',
          },
          {
            name: 'bankAgencyNumber',
            type: 'varchar',
          },
          {
            name: 'transferMoipId',
            type: 'varchar',
          },
          {
            name: 'projectId',
            type: 'int',
          },
          {
            name: 'state',
            type: 'varchar',
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
            name: 'EntrepreneurPayee',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'TargetProject',
            referencedTableName: 'projects',
            referencedColumnNames: ['id'],
            columnNames: ['projectId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('withdraw');
  }
}
