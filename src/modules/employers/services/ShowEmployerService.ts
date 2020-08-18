// Arquivo do service de criação do usuários

import AppError from '../../../shared/errors/AppError';
import EmployersRepository from '../infra/typeorm/repositories/EmployersRepository';
import Employer from '../../employers/infra/typeorm/entities/Employer';
import { classToClass } from 'class-transformer';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';

interface IRequest {
  employer_code: string;
}
export default class ShowEmployerService {
  private employersRepository: EmployersRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.employersRepository = new EmployersRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({ employer_code }: IRequest): Promise<Employer> {
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
      throw new AppError('Empregador não existente.');
    }

    delete employer.password;

    return employer;
  }
}
