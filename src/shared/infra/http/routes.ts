import { Router } from 'express';

import appointmentsRouter from '../../../modules/appointments/infra/http/routes';
import sessionsRouter from '../../../modules/users/infra/http/routes/sessions';
import usersRouter from '../../../modules/users/infra/http/routes/users';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
