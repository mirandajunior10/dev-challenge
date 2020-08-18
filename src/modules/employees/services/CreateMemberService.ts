// Arquivo do service de criação do usuários

import AppError from '../../../shared/errors/AppError';
import MembersRepository from '../infra/typeorm/repositories/MembersRepository';
import Member from '../infra/typeorm/entities/Member';
import EmployeesRepository from '../infra/typeorm/repositories/EmployeesRepository';
import EmployersRepository from '../../employers/infra/typeorm/repositories/EmployersRepository';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';
import Employer from '../../employers/infra/typeorm/entities/Employer';
import Employee from '../infra/typeorm/entities/Employee';

interface IRequest {
  employee_cpf: string;
  employer_code: string;
}
export default class CreateMemberPinCodeService {
  private membersRepository: MembersRepository;
  private employeesRepository: EmployeesRepository;
  private employersRepository: EmployersRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.membersRepository = new MembersRepository();
    this.employeesRepository = new EmployeesRepository();
    this.employersRepository = new EmployersRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({
    employee_cpf,
    employer_code,
  }: IRequest): Promise<Member> {
    //Procura os dados do empregador
    let employer = await this.cacheProvider.recover<Employer>(
      `employer:${employer_code}`,
    );

    if (!employer) {
      employer = await this.employersRepository.findById(employer_code);
      if (employer) {
        await this.cacheProvider.save(`employer:${employer_code}`, employer);
      }
    }

    if (!employer) {
      throw new AppError('Empregador não cadastrado.');
    }

    //Procura os dados do trabalhador
    let employee = await this.cacheProvider.recover<Employee>(
      `employee:${employee_cpf}`,
    );

    if (!employee) {
      employee = await this.employeesRepository.findById(employee_cpf);
      if (employee) {
        await this.cacheProvider.save(`employee:${employee_cpf}`, employee);
      }
    }

    if (!employee) {
      throw new AppError('Membro não cadastrado.');
    }

    //Verifica se o membro ja existe e o registra, se não existir
    let member = await this.cacheProvider.recover<Member>(
      `member:${employee_cpf}`,
    );

    if (!member) {
      member = await this.membersRepository.findByCPF(employee_cpf);
      if (member) {
        await this.cacheProvider.save(`member:${employee_cpf}`, member);
      }
    }

    if (member) {
      throw new AppError('Já existe um código para este membro.');
    }

    let pinCode = Math.floor(Math.random() * 90000) + 10000;
    let pin_code = String(pinCode);

    member = await this.membersRepository.create({
      employee_cpf,
      employer_code,
      pin_code,
    });

    employer.member_count += 1;
    await this.employersRepository.save(employer);
    this.cacheProvider.invalidate(`employer:${employer_code}`);

    return member;
  }
}
