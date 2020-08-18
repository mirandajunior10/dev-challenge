// Arquivo de criação de método específico do repositório de Appointments

import { getRepository, Repository } from 'typeorm';

import Member from '../entities/Member';
import ICreateMemberPinCodeDTO from '../../../dtos/ICreateMemberDTO';

class MembersRepository {
  private ormRepository: Repository<Member>;

  constructor() {
    this.ormRepository = getRepository(Member);
  }

  public async findByMemberCodeAndEmployerCode(
    member_code: string,
    employer_code: string,
  ): Promise<Member | undefined> {
    const findMember = await this.ormRepository.findOne({
      where: { member_code, employer_code },
    });

    return findMember;
  }

  public async findByCPF(employee_cpf: string): Promise<Member | undefined> {
    const findMember = await this.ormRepository.findOne({
      where: { employee_cpf },
    });

    return findMember;
  }

  public async findByPinCode(pin_code: string): Promise<Member | undefined> {
    const findMember = await this.ormRepository.findOne({
      where: { pin_code },
      relations: ['employer', 'employee'],
    });

    return findMember;
  }

  public async create(memberData: ICreateMemberPinCodeDTO): Promise<Member> {
    this.ormRepository.create(memberData);
    const pinCode = await this.ormRepository.save(memberData);
    return pinCode;
  }

  public async save(memberPinCodeData: Member): Promise<Member | undefined> {
    return this.ormRepository.save(memberPinCodeData);
  }
}

export default MembersRepository;
