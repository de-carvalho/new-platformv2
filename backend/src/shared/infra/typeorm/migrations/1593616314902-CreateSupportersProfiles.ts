import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSupportersProfiles1593616314902
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'supporter_profile',
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
            name: 'howDoYouConsidereYourself',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'typesOfcauses',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'howMuchWantToInvest',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'alreadyInvests',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'wantToReinvestBalance',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'wantToReceiveInformation',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'wantToReceiveEmail',
            type: 'boolean',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('supporter_profile');
  }
}
