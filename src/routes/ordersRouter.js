import { Router } from 'express';
import newOrder from '../controllers/ordersController.js';
import orderValidationMiddleware from '../middlewares/orderValidationMiddleware.js';

const ordersRouter = Router();

ordersRouter.post('/order', orderValidationMiddleware, newOrder);

export default ordersRouter;
