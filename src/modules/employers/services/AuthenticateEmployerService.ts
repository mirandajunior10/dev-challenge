// Arquivo do service de autenticação do usuário

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';

import AppError from '../../../shared/errors/AppError';

import EmployersRepository from '../infra/typeorm/repositories/EmployersRepository';

import { classToClass } from 'class-transformer';
import Employer from '../infra/typeorm/entities/Employer';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';

interface IRequest {
  employer_code: string;
  password: string;
}

interface IResponse {
  employer: Employer;
  token: string;
}

export default class AuthenticateUserService {
  private employersRepository: EmployersRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.employersRepository = new EmployersRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({
    employer_code,
    password,
  }: IRequest): Promise<IResponse> {
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
      throw new AppError('Empregador não existente ou senha incorreta', 401);
    }

    const passwordMatches = await compare(password, employer.password);

    if (!passwordMatches) {
      throw new AppError('Empregador não existente ou senha incorreta', 401);
    }

    // Desconstrói o token JWT
    const { secret, expiresIn } = authConfig.jwt;

    // Assina o Token
    const token = sign({}, secret, {
      subject: employer.employer_code,
      expiresIn,
    });
    delete employer.password;

    return { employer, token };
  }
}
