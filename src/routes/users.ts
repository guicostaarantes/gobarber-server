import { Router } from 'express';

import { getRepository } from 'typeorm';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();
  res.status(200).send(users);
});

usersRouter.post('/', async (req, res) => {
  const { fullName, email, password } = req.body;

  const service = new CreateUserService();

  const user = await service.execute({
    fullName,
    email,
    password,
  });

  delete user.password;

  res.status(200).send(user);
});

// usersRouter.patch('/:id', async (req, res) => {});

// usersRouter.delete('/:id', async (req, res) => {});

export default usersRouter;
