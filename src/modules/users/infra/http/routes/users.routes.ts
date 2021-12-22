import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';
import CreateUserService from '@modules/users/services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

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
      addresses: Joi.array().items({
        street: Joi.string().required(),
        district: Joi.string().required(),
        number: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
        country: Joi.string().required(),
      }).required()
    }
  }), usersController.create);

export default usersRouter;