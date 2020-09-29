import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateTransfers1592584436358
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfers',
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
          },
          {
            name: 'accountType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'method',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'userId',
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
            name: 'bankNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'agencyNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'agencyCheckNumber',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'accountNumber',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'accountCheckNumber',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'moipTransfersId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'taxDocumentType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'taxDocumentNumber',
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
            name: 'TransfersProvider',
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
    await queryRunner.dropTable('transfers');
  }
}
