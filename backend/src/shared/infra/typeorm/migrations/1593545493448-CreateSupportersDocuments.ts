import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSupportersDocuments1593545493448
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'supporter_documents',
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
            name: 'identityFront',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'identityBack',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'residentialComprovant',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paymentComprovant',
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
            name: 'SupporterOwner',
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
    await queryRunner.dropTable('supporter_documents');
  }
}
