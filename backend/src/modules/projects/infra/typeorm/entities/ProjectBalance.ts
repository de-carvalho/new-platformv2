import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Project from './Project';

@Entity('project_balance')
class ProjectBalance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  projectId: number;

  @Column()
  unavailable: string;

  @Column()
  future: string;

  @Column()
  current: string;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column('date')
  date: Date;

  @Column()
  @Exclude()
  moipAccountId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default ProjectBalance;
