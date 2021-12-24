import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import AddressesController from '../controllers/AddressesController';

const addressRouter = Router();
const addressesController = new AddressesController();

addressRouter.use(ensureAuthenticated);

addressRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      district: Joi.string().required(),
      number: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required(),
      country: Joi.string().required(),
    }
  }), addressesController.create);

// addressRouter.get('/', addressesController.show);
// addressRouter.delete('/', addressesController.delete);

export default addressRouter;