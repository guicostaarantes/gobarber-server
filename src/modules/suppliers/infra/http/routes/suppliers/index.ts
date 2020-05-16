import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getSupplier from './middleware/getSupplier';
import getSuppliers from './middleware/getSuppliers';
import postSupplier from './middleware/postSupplier';

const suppliersRouter = Router();

suppliersRouter.get('/', ensureAuthenticated, getSuppliers);

suppliersRouter.get('/:userId', ensureAuthenticated, getSupplier);

suppliersRouter.post('/', ensureAuthenticated, postSupplier);

// suppliersRouter.patch('/', ensureAuthenticated, patchUser);

// suppliersRouter.delete('/:id', async (req, res) => {});

export default suppliersRouter;
