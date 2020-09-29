import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import Refund from '@modules/payments/infra/typeorm/entities/RefundPayment';
import EntrepreneurDocument from './EntrepreneursDocuments';
import SupporterDocument from './SupporterDocuments';
import AdminCheckProject from './AdminCheckProjects';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Exclude()
  ownId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('date')
  dob: Date;

  @Column()
  email: string;

  @Column()
  @Exclude()
  emailConfirmed: boolean;

  @Column()
  @Exclude()
  emailConfirmationCode: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column()
  role: string;

  @OneToMany(() => Project, () => User)
  project: Project[];

  @OneToMany(() => Payment, () => User)
  payment: Payment[];

  @OneToMany(() => Refund, () => User)
  refundPayment: Refund[];

  @OneToMany(() => EntrepreneurDocument, () => User)
  entrepreneurDocs: EntrepreneurDocument[];

  @OneToMany(() => SupporterDocument, () => User)
  supporterDocs: SupporterDocument[];

  @OneToMany(() => AdminCheckProject, () => User)
  adminCheckProject: AdminCheckProject[];

  @Column()
  partnerId: number;

  @Column()
  bankAgencyCheckNumber: number;

  @Column()
  bankAccountCheckNumber: number;

  @Column()
  partnerConfirmed: boolean;

  @Column()
  signupDate: Date;

  @Column()
  taxDocumentType: string;

  @Column()
  taxDocumentNumber: string;

  @Column()
  gender: string;

  @Column()
  profession: string;

  @Column()
  race: string;

  @Column('text')
  partnerDescription: string;

  @Column()
  phoneArea: string;

  @Column()
  phoneNumber: string;

  @Column()
  cellphoneArea: string;

  @Column()
  cellphoneNumber: string;

  @Column()
  @Exclude()
  moipAccountId: string;

  @Column()
  @Exclude()
  moipCustomerId: string;

  @Column()
  @Exclude()
  moipToken: string;

  @Column()
  addressCity: string;

  @Column()
  addressStreet: string;

  @Column()
  addressNumber: string;

  @Column()
  addressComplement: string;

  @Column()
  addressState: string;

  @Column()
  addressDistrict: string;

  @Column()
  addressZipcode: string;

  @Column()
  accountType: string;

  @Column()
  cpfResponsible: string;

  @Column()
  emailResponsible: string;

  @Column()
  companyName: string;

  @Column()
  businessName: string;

  @Column()
  companyPhoneArea: string;

  @Column()
  companyPhoneNumber: string;

  @Column()
  companyAddressCity: string;

  @Column()
  companyAddressStreet: string;

  @Column()
  companyAddressNumber: string;

  @Column()
  companyAddressComplement: string;

  @Column()
  companyAddressState: string;

  @Column()
  companyAddressDistrict: string;

  @Column()
  companyAddressZipcode: string;

  @Column()
  companyWebsite: string;

  @Column()
  companyLogo: string;

  @Column()
  origens: string;

  @Column()
  credit: string;

  @Column()
  value: string;

  @Column()
  bankNumber: string;

  @Column()
  bankAgencyNumber: string;

  @Column()
  bankAccountNumber: string;

  @Column()
  bankAccountType: string;

  @Column()
  identityIssuer: string;

  @Column()
  identityIssueDate: string;

  @Column()
  quizScore: string;

  @Column()
  quizAnswerDate: string;

  @Column()
  about: string;

  @Column()
  @Exclude()
  passwordResetCode: string;

  @Column()
  avatar: string;

  @Column()
  partnerLinkedin: string;

  @Column()
  partnerFacebook: string;

  @Column()
  partnerInstagram: string;

  @Column()
  partnerYoutube: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'avatarUrl' })
  getavatarUrl(): string | null {
    if (!this.avatar) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${this.avatar}`;
      default:
        return null;
    }
  }
}

export default User;
