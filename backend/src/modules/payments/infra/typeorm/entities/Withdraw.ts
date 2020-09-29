import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToOne,
  // JoinColumn,
} from 'typeorm';

// import User from '@modules/users/infra/typeorm/entities/User';

@Entity('withdraw')
class ProjectPayment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  amount: string;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  @Column()
  issueDateTime: Date;

  @Column()
  bankNumber: string;

  @Column()
  bankAccountNumber: string;

  @Column()
  bankAgencyNumber: string;

  @Column()
  transferMoipId: string;

  @Column()
  state: string;

  // @ManyToOne(() => User, { eager: true })
  // @JoinColumn({ name: 'payorId' })
  // payor: User;

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
