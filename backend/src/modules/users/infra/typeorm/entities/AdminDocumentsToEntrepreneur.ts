import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('admin_documents_to_entrepreneur')
class EntrepreneurDocuments {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  contract: string;

  @Column()
  projectId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Expose({ name: 'contractUrl' })
  getContractUrl(): string | null {
    if (!this.contract) return null;

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.contract}`;
      case 'gcs':
        return `https://storage.googleapis.com/${process.env.GCS_BUCKET_ADMIN_DOCS}/${this.contract}`;
      default:
        return null;
    }
  }
}

export default EntrepreneurDocuments;
