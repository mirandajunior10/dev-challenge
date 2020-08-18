// Arquivo do service de criação do usuários

import AppError from '../../../shared/errors/AppError';
import EmployeesRepository from '../infra/typeorm/repositories/EmployeesRepository';
import Employee from '../infra/typeorm/entities/Employee';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';

interface IRequest {
  CPF: string;
}
export default class ShowEmployerService {
  private employeesRepository: EmployeesRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.employeesRepository = new EmployeesRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({ CPF }: IRequest): Promise<Employee> {
    //Procura os dados do trabalhador
    let employee = await this.cacheProvider.recover<Employee>(
      `employee:${CPF}`,
    );

    if (!employee) {
      employee = await this.employeesRepository.findById(CPF);
      if (employee) {
        await this.cacheProvider.save(`employee:${CPF}`, employee);
      }
    }

    if (!employee) {
      throw new AppError('Membro não cadastrado.');
    }

    return employee;
  }
}
