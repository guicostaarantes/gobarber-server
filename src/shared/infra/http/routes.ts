import { Router } from 'express';

import appointmentsRouter from '../../../modules/appointments/infra/http/routes';
import sessionsRouter from '../../../modules/users/infra/http/routes/sessions';
import usersRouter from '../../../modules/users/infra/http/routes/users';
import suppliersRouter from '../../../modules/suppliers/infra/http/routes/suppliers';
import vacanciesRouter from '../../../modules/vacancies/infra/http/routes/vacancies';
import proceduresRouter from '../../../modules/procedures/infra/http/routes/procedures';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/suppliers', suppliersRouter);
routes.use('/vacancies', vacanciesRouter);
routes.use('/procedures', proceduresRouter);

export default routes;
