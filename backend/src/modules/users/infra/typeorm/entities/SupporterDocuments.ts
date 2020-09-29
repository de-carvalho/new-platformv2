import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';

@Entity('supporter_documents')
class SupporterDocuments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'userId' })
  supporter: User;

  @Column()
  identityFront: string;

  @Column()
  identityBack: string;

  @Column()
  residentialComprovant: string;

  @Column()
  paymentComprovant: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'identityFrontUrl' })
  getFrontIdentityUrl(): string | null {
    if (!this.identityFront) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.identityFront}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_SUPPORTERS}/${this.identityFront}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'identityBackUrl' })
  getFrontBackUrl(): string | null {
    if (!this.identityBack) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.identityBack}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_SUPPORTERS}/${this.identityBack}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'residentialComprovantUrl' })
  getResidentialUrl(): string | null {
    if (!this.residentialComprovant) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.residentialComprovant}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_SUPPORTERS}/${this.residentialComprovant}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'paymentComprovantUrl' })
  getPaymentComprovant1Url(): string | null {
    if (!this.paymentComprovant) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.paymentComprovant}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_SUPPORTERS}/${this.paymentComprovant}`;
      default:
        return null;
    }
  }
}

export default SupporterDocuments;
