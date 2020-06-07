import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getSupplier from './middleware/getSupplier';
import getSuppliers from './middleware/getSuppliers';
import postSupplier from './middleware/postSupplier';
import patchSupplier from './middleware/patchSupplier';
import getSupplierAppointments from './middleware/getSupplierAppointments';

const suppliersRouter = Router();

suppliersRouter.get('/', ensureAuthenticated, getSuppliers);

suppliersRouter.get('/:id', ensureAuthenticated, getSupplier);

suppliersRouter.get(
  '/:id/appointments',
  ensureAuthenticated,
  getSupplierAppointments,
);

suppliersRouter.post('/', ensureAuthenticated, postSupplier);

suppliersRouter.patch('/', ensureAuthenticated, patchSupplier);

export default suppliersRouter;
