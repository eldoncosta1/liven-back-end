import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import addressRouter from '@modules/users/infra/http/routes/address.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/user/profile', profileRouter);
routes.use('/user/address', addressRouter);
routes.use('/session', sessionsRouter);
routes.use('/product', productsRouter);

export default routes;