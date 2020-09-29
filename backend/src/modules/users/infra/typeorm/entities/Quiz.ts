import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // OneToMany,
} from 'typeorm';

// import QuizAnswers from './QuizAnswers';

@Entity('quiz')
class Quiz {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  question: string;

  // @OneToMany(() => QuizAnswers, () => Quiz, { eager: true })
  // answers: QuizAnswers[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Quiz;
