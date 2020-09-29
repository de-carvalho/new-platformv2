import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatProjects1592505246379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'partnerId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'entrepreneurId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'projectType',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'firgunAnalisys',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'businessTime',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'creationDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'goal',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'raised',
            type: 'varchar',
            default: 0,
            isNullable: true,
          },
          {
            name: 'paidback',
            type: 'varchar',
            default: 0,
            isNullable: true,
          },
          {
            name: 'totalToPayback',
            type: 'varchar',
            default: 0,
            isNullable: true,
          },
          {
            name: 'totalPartnerAmount',
            type: 'varchar',
            default: 0,
            isNullable: true,
          },
          {
            name: 'firgunAmountTotal',
            type: 'varchar',
            default: 0,
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paymentState',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'pageContent',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'releasedForWithdrawal',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'withdrawn',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'moipAccountId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'moipToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dateLimit',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'gracePeriod',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'location',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'installmentsPrediction',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'installmentsPayed',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'percentageFee',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'videoUrl',
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
            name: 'ProjectProvider',
            columnNames: ['entrepreneurId'],
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
    await queryRunner.dropTable('projects');
  }
}
