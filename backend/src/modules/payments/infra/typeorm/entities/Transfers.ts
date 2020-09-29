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

@Entity('transfers')
class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: string;

  @Column()
  accountType: string;

  @Column()
  method: string;

  @Column()
  userId: number;

  @Column()
  payeeId: number;

  @Column()
  state: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  bankNumber: string;

  @Column()
  agencyNumber: string;

  @Column()
  agencyCheckNumber: number;

  @Column()
  accountNumber: number;

  @Column()
  accountCheckNumber: number;

  @Column()
  moipTransfersId: string;

  @Column()
  taxDocumentType: string;

  @Column()
  taxDocumentNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Payment;
