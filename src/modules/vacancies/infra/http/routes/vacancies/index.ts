import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import postVacancy from './middleware/postVacancy';
import delVacancy from './middleware/delVacancy';

const vacanciesRouter = Router();

vacanciesRouter.post('/', ensureAuthenticated, postVacancy);

vacanciesRouter.delete('/', ensureAuthenticated, delVacancy);

export default vacanciesRouter;
