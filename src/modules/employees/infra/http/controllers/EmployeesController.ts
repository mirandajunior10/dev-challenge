import { Request, Response } from 'express';
import { format } from 'date-fns';

import parseDate from '../../../../../shared/utils/parseDate';
import AppError from '../../../../../shared/errors/AppError';
import CreateEmployeeService from '../../../services/CreateEmployeeService';
import ShowEmployeeService from '../../../services/ShowEmployeeService';

export default class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { CPF, name, father, mother, hand, birthday } = request.body;

    const createEmployee = new CreateEmployeeService();
    const parsedBirthday = parseDate(birthday);
    if (parsedBirthday.toString() === 'Invalid Date') {
      throw new AppError('Formato de data inválido.');
    }
    const employee = await createEmployee.execute({
      CPF,
      name,
      father,
      mother,
      hand,
      birthday: parsedBirthday,
    });

    const formattedDate = format(new Date(employee.birthday), 'dd/MM/yyyy');
    const employeeResponse = { ...employee, birthday: formattedDate };

    return response.json(employeeResponse);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { CPF } = request.params;

    const showEmployee = new ShowEmployeeService();

    const employee = await showEmployee.execute({
      CPF,
    });

    const formattedDate = format(new Date(employee.birthday), 'dd/MM/yyyy');
    const employeeResponse = { ...employee, birthday: formattedDate };

    return response.json(employeeResponse);
  }
}
