import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateQuizAnswers1598627159403
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'quiz_answers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'answer',
            type: 'varchar',
          },
          {
            name: 'point',
            type: 'varchar',
          },
          {
            name: 'questionId',
            type: 'int',
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
            name: 'Question',
            referencedTableName: 'quiz',
            referencedColumnNames: ['id'],
            columnNames: ['questionId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quiz_answers');
  }
}
