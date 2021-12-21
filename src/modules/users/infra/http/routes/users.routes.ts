import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import multer from 'multer';

import CreateUserService from '@modules/users/services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

// usersRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const { id } = request.body;

//   const usersRepository = getRepository(User);

//   const users = await usersRepository.findOne({ where: { id } });

//   return response.json(users);
// });

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }
  }),
  async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password
    });

    return response.json(classToClass(user));
  });

export default usersRouter;