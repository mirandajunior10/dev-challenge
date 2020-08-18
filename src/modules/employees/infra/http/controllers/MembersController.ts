import { Request, Response } from 'express';
import CreateMemberService from '../../../services/CreateMemberService';

export default class MembersPinCodeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { employee_cpf, employer_code } = request.body;

    const createMemberPinCode = new CreateMemberService();

    const pinCode = await createMemberPinCode.execute({
      employee_cpf,
      employer_code,
    });

    return response.json(pinCode);
  }
}
