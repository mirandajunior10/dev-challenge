// Arquivo de criação de método específico do repositório de Appointments

import { getRepository, Repository } from 'typeorm';

import Employee from '../entities/Employee';
import ICreateEmployeeDTO from '../../../dtos/ICreateEmployeeDTO';

class EmployeesRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async findById(cpf: string): Promise<Employee | undefined> {
    const findEmployee = await this.ormRepository.findOne(cpf);

    return findEmployee;
  }

  public async create(employeeData: ICreateEmployeeDTO): Promise<Employee> {
    this.ormRepository.create(employeeData);
    const employee = await this.ormRepository.save(employeeData);
    return employee;
  }

  public async save(employee: Employee): Promise<Employee | undefined> {
    return this.ormRepository.save(employee);
  }
}

export default EmployeesRepository;
