import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('project_payments')
class ProjectPayment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: string;

  @Column()
  payorId: number;

  @Column()
  projectId: number;

  @Column('date')
  paymentDate: Date;

  @Column()
  payeeId: number;

  @Column()
  state: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'payorId' })
  payor: User;

  @Column()
  purpose: string;

  @Column()
  moipId: string;

  @Column()
  boletoLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default ProjectPayment;
