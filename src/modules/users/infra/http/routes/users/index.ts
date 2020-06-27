import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getUser from './middleware/getUser';
import getMeUser from './middleware/getMeUser';
import getUsers from './middleware/getUsers';
import postUser from './middleware/postUser';
import patchUser from './middleware/patchUser';
import patchAvatar from './middleware/patchAvatar';
import upload from '../../../../../../shared/infra/http/middleware/upload';
import postForgotPassword from './middleware/postForgotPassword';
import patchForgotPassword from './middleware/patchForgotPassword';

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, getUsers);

usersRouter.get('/me', ensureAuthenticated, getMeUser);

usersRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  getUser,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{8,}$/,
        )
        .required()
        .error(() => new Error('password not strong enough')),
      confirmPassword: Joi.string(),
    },
  }),
  postUser,
);

usersRouter.patch(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      fullName: Joi.string(),
    },
  }),
  patchUser,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  patchAvatar,
);

usersRouter.post(
  '/forgot-password',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  postForgotPassword,
);

usersRouter.patch(
  '/forgot-password',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      newPassword: Joi.string()
        .pattern(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{8,}$/,
        )
        .required(),
    },
  }),
  patchForgotPassword,
);

// usersRouter.delete('/:id', async (req, res) => {});

export default usersRouter;
