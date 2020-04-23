import { Router } from 'express';

import getUsers from './middleware/getUsers';
import postUser from './middleware/postUser';

const usersRouter = Router();

usersRouter.get('/', getUsers);

usersRouter.post('/', postUser);

// usersRouter.patch('/:id', async (req, res) => {});

// usersRouter.delete('/:id', async (req, res) => {});

export default usersRouter;
