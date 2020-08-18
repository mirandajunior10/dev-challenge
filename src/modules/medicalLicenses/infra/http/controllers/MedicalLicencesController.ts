import { Request, Response } from 'express';

import CreateMedicalLicenseService from '../../../services/CreateMedicalLicenseService';
import ShowMedicalLicensesService from '../../../services/ShowMedicalLicensesService';
import parseDate from '../../../../../shared/utils/parseDate';
import AppError from '../../../../../shared/errors/AppError';

export default class MedicalLicencesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { initial_date, final_date, time, member_code } = request.body;
    const { employer_code } = request.employer;

    const createMedicalLicense = new CreateMedicalLicenseService();

    const parsedInitialDate = parseDate(initial_date);
    const parsedFinalDate = parseDate(final_date);
    if (
      parsedInitialDate.toString() === 'Invalid Date' ||
      parsedFinalDate.toString() === 'Invalid Date'
    ) {
      throw new AppError('Formato de data inválido.');
    }

    const medicalLicense = await createMedicalLicense.execute({
      employer_code,
      initial_date: parsedInitialDate,
      final_date: parsedFinalDate,
      time,
      member_code,
    });

    return response.json(medicalLicense);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { employer_code } = request.employer;

    const listMedicalLicenses = new ShowMedicalLicensesService();

    const medicalLicenses = await listMedicalLicenses.execute({
      employer_code,
    });

    return response.json(medicalLicenses);
  }
}
