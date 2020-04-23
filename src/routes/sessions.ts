import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const service = new AuthenticateUserService();

  const token = await service.execute({
    email,
    password,
  });

  res.status(200).send({ token });
});

// sessionsRouter.patch('/:id', async (req, res) => {});

// sessionsRouter.delete('/:id', async (req, res) => {});

export default sessionsRouter;
