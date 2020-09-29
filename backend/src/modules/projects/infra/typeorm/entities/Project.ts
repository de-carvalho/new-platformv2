import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import EntrepreneurDocument from '@modules/users/infra/typeorm/entities/EntrepreneursDocuments';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  partnerId: number;

  @Column()
  projectType: number;

  @Column()
  firgunAnalisys: boolean;

  @Column()
  businessTime: string;

  @Column()
  entrepreneurId: number;

  @Column()
  installmentsPayed: number;

  @Column()
  firgunAmountTotal: string;

  @Column()
  totalPartnerAmount: string;

  @OneToOne(() => EntrepreneurDocument, () => Project)
  entrepreneurDoc: EntrepreneurDocument[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  goal: string;

  @Column('date')
  gracePeriod: Date;

  @Column()
  raised: string;

  @Column()
  paidback: string;

  @Column()
  totalToPayback: string;

  @Column()
  state: string;

  @Column()
  paymentState: string;

  @Column()
  category: string;

  @Column('text')
  pageContent: string;

  @Column()
  withdrawn: string;

  @Column()
  releasedForWithdrawal: boolean;

  @Column()
  @Exclude()
  moipAccountId: string;

  @Column()
  @Exclude()
  moipToken: string;

  @Column('date')
  dateLimit: Date;

  @Column()
  location: string;

  @Column()
  installmentsPrediction: number;

  @Column()
  percentageFee: string;

  @Column()
  videoUrl: string;

  @Column()
  creationDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Project;
