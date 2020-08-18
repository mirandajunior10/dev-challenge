import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../../../services/AuthenticateEmployerService';
import { format } from 'date-fns';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { employer_code, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { employer, token } = await authenticateUser.execute({
      employer_code,
      password,
    });
    const formattedDate = format(
      new Date(employer.register_date),
      'dd/MM/yyyy',
    );
    const employerResponse = { ...employer, register_date: formattedDate };

    // A senha do usuário é oculta por padrões de segurança
    return res.json({ employer: classToClass(employerResponse), token });
  }
}
