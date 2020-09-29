import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('admin_about_firgun')
class AdminAboutFirgun {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  about: string;

  @Column('text')
  awards: string;

  @Column('text')
  press: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default AdminAboutFirgun;
