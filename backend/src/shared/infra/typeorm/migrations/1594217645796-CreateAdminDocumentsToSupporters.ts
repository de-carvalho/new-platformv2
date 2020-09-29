import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAdminDocumentsToSupporters1594217645796
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin_documents_to_supporter',
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
            name: 'impactNewsletter',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'statementIRPF1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'statementIRPF2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'investmentReceipt',
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
            name: 'Supporter',
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
    await queryRunner.dropTable('admin_documents_to_supporter');
  }
}
