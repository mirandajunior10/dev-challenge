// Model de Appointment

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('employees')
class Employee {
  @PrimaryColumn()
  CPF: string;

  @Column()
  name: string;

  @Column()
  father: string;

  @Column()
  mother: string;

  @Column()
  hand: boolean;

  @Column()
  birthday: Date;
}

export default Employee;
