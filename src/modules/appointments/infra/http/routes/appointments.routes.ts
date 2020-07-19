import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';
import UserAppointmentsController from '../controllers/UserAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();
const userAppointmentsController = new UserAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// // Listando Agendamentos
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

// Criação de agendamento
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
      delivery_date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

// Listing appointments by provider
appointmentsRouter.get('/me', providerAppointmentsController.index);

appointmentsRouter.get('/me/user', userAppointmentsController.index);

export default appointmentsRouter;
