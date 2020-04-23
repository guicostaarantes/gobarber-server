import { Router } from 'express';

import ensureAuthenticated from '../middleware/ensureAuthenticated';
import getUsers from './middleware/getUsers';
import postUser from './middleware/postUser';
import patchAvatar from './middleware/patchAvatar';
import upload from '../middleware/upload';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.post('/', postUser);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  patchAvatar,
);

// usersRouter.delete('/:id', async (req, res) => {});

export default usersRouter;
