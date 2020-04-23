import { Router } from 'express';

import postSession from './middleware/postSession';

const sessionsRouter = Router();

sessionsRouter.post('/', postSession);

// sessionsRouter.delete('/:id', async (req, res) => {});

export default sessionsRouter;
