import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListAppointmentOfSupplierService from '../../../../../services/ListAppointmentsOfSupplierService';
import SuppliersRepository from '../../../../database/repositories/SuppliersRepository';

export default async (req: Request, res: Response): Promise<void> => {
  const { startDate, endDate } = req.query as {
    startDate: string;
    endDate: string;
  };

  const suppliersRepository = new SuppliersRepository();

  const supplier = await suppliersRepository.findByUserId(req.tokenUserId, []);

  const service = container.resolve(ListAppointmentOfSupplierService);

  const appointments = await service.execute({
    userId: req.tokenUserId,
    supplierId: supplier.id,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  res.status(200).send(appointments);
};
