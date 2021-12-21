import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

const passwordRouter = Router();

passwordRouter.post('/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
  }),
  async (request, response) => {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();

  });

export default passwordRouter;