import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import EmployersController from '../controllers/EmployersController';

const employersRouter = Router();
const employersController = new EmployersController();

employersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      employer_name: Joi.string().required(),
      password: Joi.string().required(),
      thumbnail: Joi.string().required(),
    },
  }),
  employersController.create,
);

employersRouter.get(
  '/:employer_code',
  celebrate({
    [Segments.PARAMS]: {
      employer_code: Joi.string().uuid().required(),
    },
  }),
  employersController.show,
);

export default employersRouter;
