// Arquivo de criação de método específico do repositório de Appointments

import { getRepository, Repository } from 'typeorm';

import Employer from '../entities/Employer';
import ICreateEmployerDTO from '../../../dtos/ICreateEmployerDTO';

class EmployersRepository {
  private ormRepository: Repository<Employer>;

  constructor() {
    this.ormRepository = getRepository(Employer);
  }

  public async findById(employer_code: string): Promise<Employer | undefined> {
    const findEmployer = await this.ormRepository.findOne(employer_code);

    return findEmployer;
  }

  public async findByName(
    employer_name: string,
  ): Promise<Employer | undefined> {
    const findEmployer = await this.ormRepository.findOne({
      where: { employer_name },
    });

    return findEmployer;
  }

  public async create(employerData: ICreateEmployerDTO): Promise<Employer> {
    const newEmployer = new Employer();

    Object.assign(newEmployer, { ...employerData, member_count: 0 });

    this.ormRepository.create(newEmployer);
    const employer = await this.ormRepository.save(newEmployer);
    return employer;
  }

  public async save(employer: Employer): Promise<Employer | undefined> {
    return this.ormRepository.save(employer);
  }
}

export default EmployersRepository;
