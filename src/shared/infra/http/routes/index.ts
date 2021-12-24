import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import addressRouter from '@modules/users/infra/http/routes/address.routes';

const routes = Router();

routes.use('/user', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/address', addressRouter);

export default routes;