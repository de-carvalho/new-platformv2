import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEntrepreneursDocuments1593628106703
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entrepreneur_documents',
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
            name: 'projectId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar',
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
            name: 'comercialResidenceComprovant',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cnpjComprovant',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'propertyLeaseAgreement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paymentComprovant1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paymentComprovant2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'paymentComprovant3',
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
            name: 'EntrepreneurProvider',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Project',
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
    await queryRunner.dropTable('entrepreneur_documents');
  }
}
