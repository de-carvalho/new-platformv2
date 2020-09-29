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

@Entity('projects_supporter')
class ProjectSupporter {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: string;

  @Column()
  projectKind: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  supporter: User;

  @Column()
  projectId: number;

  @Column()
  userId: number;

  @Column()
  amountCorrected: string;

  @Column()
  totalInstallments: number;

  @Column()
  amountInterest: string;

  @Column()
  amountToReceive: string;

  @Column()
  amountPerInstallment: string;

  @Column()
  totalAmountReceivable: string;

  @Column()
  projectState: string;

  @Column()
  confirmationToShowPhoto: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default ProjectSupporter;
