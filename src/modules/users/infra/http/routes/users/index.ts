import { Router } from 'express';

import ensureAuthenticated from '../../../../../../shared/infra/http/middleware/ensureAuthenticated';
import getUser from './middleware/getUser';
import getUsers from './middleware/getUsers';
import postUser from './middleware/postUser';
import patchUser from './middleware/patchUser';
import patchAvatar from './middleware/patchAvatar';
import upload from '../../../../../../shared/infra/http/middleware/upload';
import postForgotPassword from './middleware/postForgotPassword';
import patchForgotPassword from './middleware/patchForgotPassword';

const usersRouter = Router();

usersRouter.get('/', ensureAuthenticated, getUsers);

usersRouter.get('/:id', ensureAuthenticated, getUser);

usersRouter.post('/', postUser);

usersRouter.patch('/', ensureAuthenticated, patchUser);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  patchAvatar,
);

usersRouter.post('/forgot-password', postForgotPassword);

usersRouter.patch('/forgot-password', patchForgotPassword);

// usersRouter.delete('/:id', async (req, res) => {});

export default usersRouter;
