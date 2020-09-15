import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

import itemsRouter from '@modules/items/infra/http/routes/items.routes';
import shippingRouter from '@modules/shipping/infra/http/routes/shipping.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

import washersRouter from '@modules/washers/infra/http/routes/washers.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.use('/items', itemsRouter);
routes.use('/shipping', shippingRouter);
routes.use('/orders', ordersRouter);

routes.use('/washers', washersRouter);

export default routes;
