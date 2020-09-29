import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProjectsSupporters1592841398409
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects_supporter',
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
            name: 'amountCorrected',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'totalInstallments',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'amountInterest',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'projectKind',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'projectId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'amountPerInstallment',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountToReceive',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'totalAmountReceivable',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'projectState',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'confirmationToShowPhoto',
            type: 'boolean',
            isNullable: true,
            default: false,
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
            name: 'SupporterProjectProvider',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'ProjectSupported',
            columnNames: ['projectId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'projects',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects_supporter');
  }
}
