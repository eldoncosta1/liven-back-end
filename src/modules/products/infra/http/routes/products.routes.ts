import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string()
  }
}), productsController.showById);

productsRouter.get('/', productsController.show);

export default productsRouter;