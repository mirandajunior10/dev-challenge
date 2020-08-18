// Model de Appointment

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('employers')
class Employer {
  @PrimaryGeneratedColumn('uuid')
  employer_code: string;

  @Column()
  password: string;

  @Column()
  employer_name: string;

  @Column()
  member_count: number;

  @Column()
  thumbnail: string;

  @CreateDateColumn()
  register_date: Date;
}

export default Employer;
