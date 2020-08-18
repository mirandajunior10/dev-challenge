import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '../../../services/AuthenticateEmployerService';

export default class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { employer_code, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { employer, token } = await authenticateUser.execute({
      employer_code,
      password,
    });

    // A senha do usuário é oculta por padrões de segurança
    return res.json({ employer: classToClass(employer), token });
  }
}
