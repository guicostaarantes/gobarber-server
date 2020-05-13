import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getUser from './middleware/getUser';
import getUsers from './middleware/getUsers';
import postUser from './middleware/postUser';
import patchAvatar from './middleware/patchAvatar';
import upload from '../../../../../../shared/infra/http/middleware/upload';
import postForgotPassword from './middleware/postForgotPassword';

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, getUsers);

usersRouter.get('/:id', ensureAuthenticated, getUser);

usersRouter.post('/', postUser);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  patchAvatar,
);

usersRouter.post('/forgot-password', postForgotPassword);

// usersRouter.delete('/:id', async (req, res) => {});

export default usersRouter;
