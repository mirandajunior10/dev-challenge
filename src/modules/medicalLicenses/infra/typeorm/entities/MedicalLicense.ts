// Model de Appointment

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('medical_licenses')
class MedicalLicense {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @Column()
  initial_date: Date;

  @Column()
  final_date: Date;

  @Column()
  time: number;

  @Column()
  @Exclude()
  employer_code: string;

  @CreateDateColumn()
  @Exclude()
  member_code: number;
}

export default MedicalLicense;
