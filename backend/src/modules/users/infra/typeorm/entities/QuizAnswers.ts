import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  // ManyToOne,
} from 'typeorm';

// import Quiz from './Quiz';

@Entity('quiz_answers')
class QuizAnswers {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  answer: string;

  @Column()
  point: string;

  @Column()
  questionId: number;

  // @ManyToOne(() => Quiz, () => QuizAnswers)
  // question: Quiz;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default QuizAnswers;
