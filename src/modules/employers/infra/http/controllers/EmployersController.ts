import { Request, Response } from 'express';
import { format } from 'date-fns';
import CreateEmployerService from '../../../services/CreateEmployerService';
import ShowEmployerService from '../../../services/ShowEmployerService';
import { hash } from 'bcryptjs';
import parseDate from '../../../../../shared/utils/parseDate';

export default class EmployersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { employer_name, password, thumbnail } = request.body;

    const createEmployer = new CreateEmployerService();

    const hashedPassword = await hash(password, 8);

    const employer = await createEmployer.execute({
      employer_name,
      password: hashedPassword,
      thumbnail,
    });

    const formattedDate = format(employer.register_date, 'dd/MM/yyyy');
    const employerResponse = { ...employer, register_date: formattedDate };

    return response.json(employerResponse);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { employer_code } = request.params;

    const showEmployer = new ShowEmployerService();

    const employer = await showEmployer.execute({
      employer_code,
    });
    const formattedDate = format(
      new Date(employer.register_date),
      'dd/MM/yyyy',
    );
    const employerResponse = { ...employer, register_date: formattedDate };

    return response.json(employerResponse);
  }
}
