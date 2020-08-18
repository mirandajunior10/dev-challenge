import { Router } from 'express';
import employersRouter from '../../../../modules/employers/infra/http/routes/employers.routes';
import sessionsRouter from '../../../../modules/employers/infra/http/routes/sessions.routes';
import employeesRouter from '../../../../modules/employees/infra/http/routes/employees.routes';
import membersRouter from '../../../../modules/employees/infra/http/routes/members.routes';
import medicalLicensesRouter from '../../../../modules/medicalLicenses/infra/http/routes/medicalLicenses.routes';

const routes = Router();

routes.use('/employer', employersRouter);
routes.use('/employee', employeesRouter);
routes.use('/check-pin', membersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/', medicalLicensesRouter);

export default routes;
