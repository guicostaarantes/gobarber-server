import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getSupplier from './middleware/getSupplier';
import getSuppliers from './middleware/getSuppliers';
import postSupplier from './middleware/postSupplier';
import patchSupplier from './middleware/patchSupplier';
import delSupplier from './middleware/delSupplier';

const suppliersRouter = Router();

suppliersRouter.get('/', ensureAuthenticated, getSuppliers);

suppliersRouter.get('/:id', ensureAuthenticated, getSupplier);

suppliersRouter.post('/', ensureAuthenticated, postSupplier);

suppliersRouter.patch('/', ensureAuthenticated, patchSupplier);

suppliersRouter.delete('/', ensureAuthenticated, delSupplier);

export default suppliersRouter;
