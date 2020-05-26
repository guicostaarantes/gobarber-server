import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import postVacancy from './middleware/postVacancy';
import getVacancies from './middleware/getVacancies';
import delVacancy from './middleware/delVacancy';

const vacanciesRouter = Router();

vacanciesRouter.post('/', ensureAuthenticated, postVacancy);

vacanciesRouter.get('/:supplierId', ensureAuthenticated, getVacancies);

vacanciesRouter.delete('/', ensureAuthenticated, delVacancy);

export default vacanciesRouter;
