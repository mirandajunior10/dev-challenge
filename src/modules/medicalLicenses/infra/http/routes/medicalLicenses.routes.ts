import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import MedicalLicensesController from '../controllers/MedicalLicencesController';
import ensureAuthenticated from '../../../../employers/infra/http/middlewares/ensureAuthenticated';

const medicalLicensesController = new MedicalLicensesController();

const medicalLicensesRouter = Router();

medicalLicensesRouter.use(ensureAuthenticated);

medicalLicensesRouter.post(
  '/submit-medical-license',
  celebrate({
    [Segments.BODY]: {
      initial_date: Joi.string().required(),
      final_date: Joi.string().required(),
      time: Joi.number().required(),
      member_code: Joi.number().required(),
    },
  }),
  medicalLicensesController.create,
);

medicalLicensesRouter.get('/medical-licenses', medicalLicensesController.show);

export default medicalLicensesRouter;
