// Arquivo do service de criação do usuários

import AppError from '../../../shared/errors/AppError';
import MedicalLicensesRepository from '../infra/typeorm/repositories/MedicalLicensesRepository';
import MedicalLicense from '../infra/typeorm/entities/MedicalLicense';
import MembersRepository from '../../employees/infra/typeorm/repositories/MembersRepository';
import { classToClass } from 'class-transformer';
import { compareAsc, format } from 'date-fns';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';
interface IRequest {
  employer_code: string;
  initial_date: Date;
  final_date: Date;
  time: number;
  member_code: number;
}
export default class CreateEmployerService {
  private medicalLicensesRepository: MedicalLicensesRepository;
  private membersRepository: MembersRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.medicalLicensesRepository = new MedicalLicensesRepository();
    this.membersRepository = new MembersRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({
    employer_code,
    initial_date,
    final_date,
    time,
    member_code,
  }: IRequest): Promise<MedicalLicense> {
    const member = await this.membersRepository.findByMemberCodeAndEmployerCode(
      String(member_code),
      employer_code,
    );

    if (!member) {
      throw new AppError('Membro não encontrado');
    }

    let compare = compareAsc(initial_date, new Date());

    if (compare > 0) {
      throw new AppError('Data inicial não pode ser posterior à data atual.');
    }

    compare = compareAsc(initial_date, final_date);

    if (compare > 0) {
      throw new AppError('Data final não pode ser anterior à data inicial.');
    }

    if (time > 480) {
      throw new AppError(
        'Tempo de abono não pode ser maior do que oito horas.',
      );
    }

    const medicalLicense = await this.medicalLicensesRepository.create({
      employer_code,
      initial_date,
      final_date,
      time,
      member_code,
    });
    let formattedInitialDate = format(
      new Date(medicalLicense.initial_date),
      'dd/MM/yyyy',
    );
    let formattedFinalDate = format(
      new Date(medicalLicense.final_date),
      'dd/MM/yyyy',
    );

    Object.assign(medicalLicense, {
      ...medicalLicense,
      initial_date: formattedInitialDate,
      final_date: formattedFinalDate,
    });

    delete medicalLicense.id;
    delete medicalLicense.employer_code;

    await this.cacheProvider.invalidate(`medical-licenses:${employer_code}`);

    return classToClass(medicalLicense);
  }
}
