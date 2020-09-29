import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('supporter_profile')
class SupporterProfile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  howDoYouConsidereYourself: number;

  @Column()
  typesOfcauses: string;

  @Column('decimal')
  howMuchWantToInvest: number;

  @Column()
  alreadyInvests: boolean;

  @Column()
  wantToReinvestBalance: boolean;

  @Column()
  wantToReceiveInformation: boolean;

  @Column()
  wantToReceiveEmail: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default SupporterProfile;
