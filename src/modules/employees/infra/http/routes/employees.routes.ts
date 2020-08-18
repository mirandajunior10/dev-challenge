import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EmployeesController from '../controllers/EmployeesController';

const employeesRouter = Router();
const employeesController = new EmployeesController();

employeesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      CPF: Joi.string().required(),
      name: Joi.string().required(),
      father: Joi.string().required(),
      mother: Joi.string().required(),
      hand: Joi.boolean().required(),
      birthday: Joi.string().required(),
    },
  }),
  employeesController.create,
);

employeesRouter.get(
  '/:CPF',
  celebrate({
    [Segments.PARAMS]: {
      CPF: Joi.string().required(),
    },
  }),
  employeesController.show,
);

export default employeesRouter;
