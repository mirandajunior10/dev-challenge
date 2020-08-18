// Arquivo do service de criação do usuários

import { classToClass } from 'class-transformer';
import AppError from '../../../shared/errors/AppError';
import MedicalLicensesRepository from '../infra/typeorm/repositories/MedicalLicensesRepository';
import MedicalLicense from '../infra/typeorm/entities/MedicalLicense';
import RedisCacheProvider from '../../../shared/providers/RedisCacheProvider';
import { format } from 'date-fns';

interface IRequest {
  employer_code: string;
}
export default class ShowEmployerService {
  private medicalLicensesRepository: MedicalLicensesRepository;
  private cacheProvider: RedisCacheProvider;

  constructor() {
    this.medicalLicensesRepository = new MedicalLicensesRepository();
    this.cacheProvider = new RedisCacheProvider();
  }

  public async execute({ employer_code }: IRequest): Promise<MedicalLicense[]> {
    const cacheKey = `medical-licenses:${employer_code}`;
    try {
      let medicalLicenses = await this.cacheProvider.recover<MedicalLicense[]>(
        cacheKey,
      );

      if (medicalLicenses) {
        medicalLicenses.forEach((medicalLicense) => {
          delete medicalLicense.id;
          delete medicalLicense.member_code;
          delete medicalLicense.employer_code;
        });
      } else {
        medicalLicenses = await this.medicalLicensesRepository.findByEmployerCode(
          employer_code,
        );
        await this.cacheProvider.save(cacheKey, medicalLicenses);
      }

      //formatação das datas iniciais e final de cada licença médica
      medicalLicenses.forEach((medicalLicense) => {
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
      });

      return classToClass(medicalLicenses);
    } catch (error) {
      throw new AppError('Erro no servidor.');
    }
  }
}
