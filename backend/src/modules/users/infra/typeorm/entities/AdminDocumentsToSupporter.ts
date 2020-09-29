import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('admin_documents_to_supporter')
class EntrepreneurDocuments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  impactNewsletter: string;

  @Column()
  statementIRPF1: string;

  @Column()
  statementIRPF2: string;

  @Column()
  investmentReceipt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'impactNewsletterUrl' })
  getImpactNewsletterUrl(): string | null {
    if (!this.impactNewsletter) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.impactNewsletter}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ADMIN_DOCS}/${this.impactNewsletter}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'statementIRPF1Url' })
  getStatementIRPF1Url(): string | null {
    if (!this.statementIRPF1) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.statementIRPF1}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ADMIN_DOCS}/${this.statementIRPF1}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'statementIRPF2Url' })
  getStatementIRPF2Url(): string | null {
    if (!this.statementIRPF2) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.statementIRPF2}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ADMIN_DOCS}/${this.statementIRPF2}`;
      default:
        return null;
    }
  }

  @Expose({ name: 'investmentReceiptUrl' })
  getInvestmentReceiptUrl(): string | null {
    if (!this.investmentReceipt) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.investmentReceipt}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ADMIN_DOCS}/${this.investmentReceipt}`;
      default:
        return null;
    }
  }
}

export default EntrepreneurDocuments;
