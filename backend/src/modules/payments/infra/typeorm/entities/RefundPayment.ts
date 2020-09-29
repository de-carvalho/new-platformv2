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

@Entity('refund_payments')
class RefundPayment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: string;

  @Column()
  reimburserId: number;

  @Column()
  purpose: string;

  @Column()
  moipOrderId: string;

  @Column()
  projectId: number;

  @Column('date')
  paymentDate: Date;

  @Column()
  state: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reimburserId' })
  reimburser: User;

  @Column()
  totalPayees: number;

  @Column()
  installments: number;

  @Column()
  moipId: string;

  @Column()
  boletoLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default RefundPayment;
