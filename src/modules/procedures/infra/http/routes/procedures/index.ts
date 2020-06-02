import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getProcedures from './middleware/getProcedures';
import postProcedure from './middleware/postProcedure';
import patchProcedure from './middleware/patchProcedure';
import delProcedure from './middleware/delProcedure';

const proceduresRouter = Router();

proceduresRouter.get('/:supplierId', ensureAuthenticated, getProcedures);

proceduresRouter.post('/', ensureAuthenticated, postProcedure);

proceduresRouter.patch('/:procedureId', ensureAuthenticated, patchProcedure);

proceduresRouter.delete('/:procedureId', ensureAuthenticated, delProcedure);

export default proceduresRouter;
