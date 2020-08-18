// Arquivo do service de criação do usuários

import AppError from '../../../shared/errors/AppError';
import MembersRepository from '../infra/typeorm/repositories/MembersRepository';
import Member from '../infra/typeorm/entities/Member';
import EmployersRepository from '../../employers/infra/typeorm/repositories/EmployersRepository';

interface IRequest {
  pin_code: string;
  employer_code: string;
}
export default class CheckMemberPinCodeService {
  private employersRepository: EmployersRepository;
  private membersPinCodeRepository: MembersRepository;

  constructor() {
    this.employersRepository = new EmployersRepository();
    this.membersPinCodeRepository = new MembersRepository();
  }

  public async execute({ pin_code, employer_code }: IRequest): Promise<Member> {
    const checkEmployerCodeExists = await this.employersRepository.findById(
      employer_code,
    );

    if (!checkEmployerCodeExists) {
      throw new AppError('Empregador não cadastrado.');
    }

    const memberPinCode = await this.membersPinCodeRepository.findByPinCode(
      pin_code,
    );

    if (!memberPinCode) {
      throw new AppError('Código incorreto ou empregado não cadastrado');
    }

    return memberPinCode;
  }
}
