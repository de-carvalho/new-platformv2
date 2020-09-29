import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class AdminCheckProjects1593708758541
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin_check_projects',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'entrepreneurId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'projectId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'entrepreneurDocsId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'projectType',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'projectState',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountWanted',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'confirmedByEntrepreneur',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'amountPerInstallment',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'totalInstallments',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'percentageFee',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'receiveDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'gracePeriod',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'firgunAnalysis',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'loanMargin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amountToPayback',
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
            name: 'EntrepreneurProviderr',
            columnNames: ['entrepreneurId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'EntrepreneurDocuments',
            columnNames: ['entrepreneurDocsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'entrepreneur_documents',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'EntrepreneurProject',
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
    await queryRunner.dropTable('admin_check_projects');
  }
}
