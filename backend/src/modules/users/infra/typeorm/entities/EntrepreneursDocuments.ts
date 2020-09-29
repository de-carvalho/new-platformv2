import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

@Entity('entrepreneur_documents')
class EntrepreneurDocuments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @Column()
  identityFront: string;

  @Column()
  status: string;

  @Column()
  identityBack: string;

  @Column()
  residentialComprovant: string;

  @Column()
  comercialResidenceComprovant: string;

  @Column()
  cnpjComprovant: string;

  @Column()
  propertyLeaseAgreement: string;

  @Column()
  paymentComprovant1: string;

  @Column()
  paymentComprovant2: string;

  @Column()
  paymentComprovant3: string;

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
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.identityFront}`;
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
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.identityBack}`;
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
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.residentialComprovant}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'comercialComprovantUrl' })
  getComercialUrl(): string | null {
    if (!this.comercialResidenceComprovant) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.comercialResidenceComprovant}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.comercialResidenceComprovant}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'cnpjComprovantUrl' })
  getCnpjUrl(): string | null {
    if (!this.cnpjComprovant) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.cnpjComprovant}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.cnpjComprovant}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'propertyLeaseAgreementUrl' })
  getLeaseAgreementUrl(): string | null {
    if (!this.propertyLeaseAgreement) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.propertyLeaseAgreement}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.propertyLeaseAgreement}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'paymentComprovant1Url' })
  getPaymentComprovant1Url(): string | null {
    if (!this.paymentComprovant1) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.paymentComprovant1}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.paymentComprovant1}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'paymentComprovant2Url' })
  getPaymentComprovant2Url(): string | null {
    if (!this.paymentComprovant2) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.paymentComprovant2}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.paymentComprovant2}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'paymentComprovant3Url' })
  getPaymentComprovant3Url(): string | null {
    if (!this.paymentComprovant3) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.paymentComprovant3}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ENTREPRENEURS}/${this.paymentComprovant3}`;
      default:
        return null;
    }
  }
}

export default EntrepreneurDocuments;
