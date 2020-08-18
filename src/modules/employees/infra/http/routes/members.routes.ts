import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PinCodesController from '../controllers/MembersController';
import PinCodeCheckController from '../controllers/MembersPinCodeCheckController';

const pinCodesRouter = Router();
const pinCodesController = new PinCodesController();
const pinCodeCheckController = new PinCodeCheckController();

pinCodesRouter.post(
  '/:employerCode',
  celebrate({
    [Segments.BODY]: {
      pin_code: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      employerCode: Joi.string().uuid().required(),
    },
  }),
  pinCodeCheckController.index,
);

pinCodesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      employee_cpf: Joi.string().required(),
      employer_code: Joi.string().uuid().required(),
    },
  }),
  pinCodesController.create,
);

export default pinCodesRouter;
