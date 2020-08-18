import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Employer from '../../../../employers/infra/typeorm/entities/Employer';
import Employee from './Employee';

@Entity('members')
class Member {
  @PrimaryColumn()
  member_code: number;

  @Column()
  pin_code: string;

  @Column()
  employer_code: string;

  @Column()
  employee_cpf: string;

  @ManyToOne(() => Employer)
  @JoinColumn({ name: 'employer_code' })
  employer: Employer;

  @OneToOne(() => Employee)
  @JoinColumn({ name: 'employee_cpf' })
  employee: Employee;
}

export default Member;
