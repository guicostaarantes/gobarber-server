import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getSupplier from './middleware/getSupplier';
import getMeSupplier from './middleware/getMeSupplier';
import getSuppliers from './middleware/getSuppliers';
import postSupplier from './middleware/postSupplier';
import patchSupplier from './middleware/patchSupplier';
import getSupplierAppointments from './middleware/getSupplierAppointments';
import getMeSupplierAppointments from './middleware/getMeSupplierAppointments';
import getSupplierProcedures from './middleware/getSupplierProcedures';

const suppliersRouter = Router();

suppliersRouter.get(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      position: Joi.string()
        .required()
        .pattern(/^-?[0-9]{1,2}\.[0-9]{4,6},-?[0-9]{1,2}\.[0-9]{4,6}$/),
      tolerance: Joi.number().required(),
    },
  }),
  getSuppliers,
);

suppliersRouter.get('/me', ensureAuthenticated, getMeSupplier);

suppliersRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
  getSupplier,
);

suppliersRouter.get(
  '/me/appointments',
  ensureAuthenticated,
  celebrate({
    [Segments.QUERY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  getMeSupplierAppointments,
);

suppliersRouter.get(
  '/:id/appointments',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.QUERY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  getSupplierAppointments,
);

suppliersRouter.get(
  '/:id/procedures',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getSupplierProcedures,
);

suppliersRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  }),
  postSupplier,
);

suppliersRouter.patch(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      latitude: Joi.number(),
      longitude: Joi.number(),
    },
  }),
  patchSupplier,
);

export default suppliersRouter;
