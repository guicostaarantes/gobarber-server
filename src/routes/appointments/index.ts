import { Router } from 'express';

import ensureAuthenticated from '../middleware/ensureAuthenticated';
import getAppointments from './middleware/getAppointments';
import postAppointment from './middleware/postAppointment';

const appointmentsRouter = Router();

appointmentsRouter.get('/', getAppointments);

appointmentsRouter.post('/', ensureAuthenticated, postAppointment);

// appointmentsRouter.patch('/:id', async (req, res) => {});

// appointmentsRouter.delete('/:id', async (req, res) => {});

export default appointmentsRouter;
