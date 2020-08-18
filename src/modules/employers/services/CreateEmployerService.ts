// Arquivo do service de criação do usuários

import AppError from '../../../shared/errors/AppError';
import EmployersRepository from '../infra/typeorm/repositories/EmployersRepository';
import Employer from '../infra/typeorm/entities/Employer';
import { classToClass } from 'class-transformer';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';

interface IRequest {
  employer_name: string;
  password: string;
  thumbnail: string;
}
export default class CreateEmployerService {
  private employersRepository: EmployersRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.employersRepository = new EmployersRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({
    employer_name,
    password,
    thumbnail,
  }: IRequest): Promise<Employer> {
    const employer = await this.employersRepository.create({
      employer_name,
      password,
      thumbnail,
    });

    await this.cacheProvider.save(
      `employer:${employer.employer_code}`,
      employer,
    );

    delete employer.password;

    return employer;
  }
}
