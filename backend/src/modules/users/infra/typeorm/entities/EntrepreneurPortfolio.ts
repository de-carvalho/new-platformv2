import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('entrepreneur_portfolio')
class EntrepreneurPortfolio {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  requestedAmount: string;

  @Column()
  amountCaptured: string;

  @Column()
  percentageFee: string;

  @Column()
  signupDate: Date;

  @Column()
  receiptDate: Date;

  @Column()
  installment: number;

  @Column()
  projectName: string;

  @Column()
  userName: string;

  @Column()
  projectId: number;

  @Column()
  partnerId: number;

  @Column()
  status: string;

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default EntrepreneurPortfolio;
