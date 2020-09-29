import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('supporter_loan_situations')
class SupporterLoanSituation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  projectName: string;

  @Column()
  amountInvested: string;

  @Column()
  amountReceived: string;

  @Column()
  amountCorrected: string;

  @Column()
  amountInterest: string;

  @Column()
  installmentPayed: number;

  @Column()
  totalInstallments: number;

  @Column()
  status: string;

  @Column()
  refundStatus: string;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default SupporterLoanSituation;
