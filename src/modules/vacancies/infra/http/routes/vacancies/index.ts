import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import postVacancy from './middleware/postVacancy';
import getVacancies from './middleware/getVacancies';
import delVacancy from './middleware/delVacancy';

const vacanciesRouter = Router();

vacanciesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  postVacancy,
);

vacanciesRouter.get(
  '/:supplierId',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: { supplierId: Joi.string().uuid().required() },
    [Segments.BODY]: { startDate: Joi.date(), endDate: Joi.date().required() },
  }),
  getVacancies,
);

vacanciesRouter.delete(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    },
  }),
  delVacancy,
);

export default vacanciesRouter;
