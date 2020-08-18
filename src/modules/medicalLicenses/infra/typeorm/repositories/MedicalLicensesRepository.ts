// Arquivo de criação de método específico do repositório de Appointments

import { getRepository, Repository } from 'typeorm';

import MedicalLicense from '../entities/MedicalLicense';
import ICreateMedicalLicenseDTO from '../../../dtos/ICreateMedicalLicenseDTO';

class MedicalLicensesRepository {
  private ormRepository: Repository<MedicalLicense>;

  constructor() {
    this.ormRepository = getRepository(MedicalLicense);
  }

  public async create(
    medicalLicenseData: ICreateMedicalLicenseDTO,
  ): Promise<MedicalLicense> {
    this.ormRepository.create(medicalLicenseData);
    const medicalLicense = await this.ormRepository.save(medicalLicenseData);
    return medicalLicense;
  }
  public async findByEmployerCode(
    employer_code: string,
  ): Promise<MedicalLicense[]> {
    return await this.ormRepository.find({
      where: { employer_code },
    });
  }

  public async save(
    medicalLicenseData: MedicalLicense,
  ): Promise<MedicalLicense | undefined> {
    return this.ormRepository.save(medicalLicenseData);
  }
}

export default MedicalLicensesRepository;
