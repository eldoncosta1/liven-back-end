import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    }
  }),
  async (request, response) => {
    const user_id = request.user.id;
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(user));

  });

profileRouter.get('/', async (request, response) => {
  const user_id = request.user.id;

  const showProfile = container.resolve(ShowProfileService);

  const user = await showProfile.execute({
    user_id
  });

  return response.json(classToClass(user));

});

export default profileRouter;