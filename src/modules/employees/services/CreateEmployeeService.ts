// Arquivo do service de criação do usuários

import AppError from '../../../shared/errors/AppError';
import EmployeesRepository from '../infra/typeorm/repositories/EmployeesRepository';
import Employee from '../infra/typeorm/entities/Employee';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';

interface IRequest {
  CPF: string;
  name: string;
  father: string;
  mother: string;
  hand: false;
  birthday: Date;
}
export default class CreateEmployerService {
  private employeesRepository: EmployeesRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.employeesRepository = new EmployeesRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({
    CPF,
    name,
    father,
    mother,
    hand,
    birthday,
  }: IRequest): Promise<Employee> {
    //Procura os dados do trabalhador
    let employee = await this.employeesRepository.findById(CPF);

    if (employee) {
      throw new AppError('Já existe um empregado registrado com este CPF.');
    }

    employee = await this.employeesRepository.create({
      CPF,
      name,
      father,
      mother,
      hand,
      birthday,
    });

    await this.cacheProvider.save(`employee:${CPF}`, employee);

    return employee;
  }
}
