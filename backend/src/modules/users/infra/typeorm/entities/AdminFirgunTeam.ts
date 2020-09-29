import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '@config/upload';

@Entity('admin_firgun_team')
class AdminFirgunTeam {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  cellPhoneNumber: string;

  @Column()
  cpfNumber: string;

  @Column()
  occupation: string;

  @Column()
  linkedin: string;

  @Column()
  avatar: string;

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

export default AdminFirgunTeam;
