import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1592505047782 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'ownId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dob',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailConfirmed',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'emailConfirmationCode',
            type: 'string',
            isNullable: true,
            default: false,
          },
          {
            name: 'passwordHash',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'profession',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'race',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'partnerId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'partnerConfirmed',
            type: 'boolean',
            isNullable: true,
            default: false,
          },
          {
            name: 'signupDate',
            type: 'datetime',
            isNullable: true,
            default: 'now()',
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
            name: 'partnerDescription',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'phoneArea',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cellphoneArea',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cellphoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'moipAccountId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'moipCustomerId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'moipToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressCity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressStreet',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressComplement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressState',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressDistrict',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressZipcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'accountType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cpfResponsible',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emailResponsible',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'businessName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyPhoneArea',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyPhoneNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyAddressCity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyAddressStreet',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyAddressNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyAddressComplement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyAddressState',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyAddressDistrict',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyAddressZipcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyWebsite',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyLogo',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'origens',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'credit',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'value',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'bankNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bankAgencyNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bankAccountNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bankAccountType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bankAgencyCheckNumber',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'bankAccountCheckNumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'identityIssuer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'identityIssueDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quizScore',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quizAnswerDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'about',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'passwordResetCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'partnerLinkedin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'partnerFacebook',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'partnerInstagram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'partnerYoutube',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
