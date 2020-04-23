import { Router } from 'express';

import appointmentsRouter from './appointments';
import sessionsRouter from './sessions';
import usersRouter from './users';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

export default routes;
