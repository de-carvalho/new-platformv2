import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import EntrepreneurDocument from '@modules/users/infra/typeorm/entities/EntrepreneursDocuments';

@Entity('admin_check_projects')
class AdminCheckProjects {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  entrepreneurId: number;

  @OneToOne(() => User, { lazy: true })
  @JoinColumn({ name: 'entrepreneurId' })
  entrepreneur: Promise<User>;

  @Column()
  amountWanted: string;

  @Column()
  amountPerInstallment: string;

  @Column()
  totalInstallments: number;

  @Column()
  percentageFee: string;

  @Column()
  loanMargin: string;

  @Column()
  projectState: string;

  @Column('date')
  gracePeriod: Date;

  @Column('date')
  receiveDate: Date;

  @Column()
  projectId: number;

  @OneToOne(() => Project, { lazy: true })
  @JoinColumn({ name: 'projectId' })
  project: Promise<Project>;

  @Column()
  confirmedByEntrepreneur: boolean;

  @Column()
  entrepreneurDocsId: number;

  @OneToOne(() => EntrepreneurDocument, { lazy: true })
  @JoinColumn({ name: 'entrepreneurDocsId' })
  documents: Promise<EntrepreneurDocument>;

  @Column()
  projectType: number;

  @Column()
  amountToPayback: string;

  @Column()
  firgunAnalysis: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default AdminCheckProjects;
