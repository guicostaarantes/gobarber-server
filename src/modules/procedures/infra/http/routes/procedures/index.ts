import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getProcedures from './middleware/getProcedures';
import postProcedure from './middleware/postProcedure';
import patchProcedure from './middleware/patchProcedure';
import delProcedure from './middleware/delProcedure';

const proceduresRouter = Router();

proceduresRouter.get(
  '/:supplierId',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: { supplierId: Joi.string().uuid().required() },
  }),
  getProcedures,
);

proceduresRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      duration: Joi.number().required(),
      price: Joi.number().required(),
    },
  }),
  postProcedure,
);

proceduresRouter.patch(
  '/:procedureId',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: { procedureId: Joi.string().uuid().required() },
    [Segments.BODY]: {
      name: Joi.string(),
      duration: Joi.number(),
      price: Joi.number(),
    },
  }),
  patchProcedure,
);

proceduresRouter.delete(
  '/:procedureId',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: { procedureId: Joi.string().uuid().required() },
  }),
  delProcedure,
);

export default proceduresRouter;
