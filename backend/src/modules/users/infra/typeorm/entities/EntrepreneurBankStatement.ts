import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('entrepreneur_bank_statement')
class EntrepreneurBankStatement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  amount: string;

  @Column('date')
  dueDate: Date;

  @Column()
  installment: number;

  @Column()
  projectName: string;

  @Column()
  projectId: number;

  @Column()
  status: string;

  @Column()
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default EntrepreneurBankStatement;
