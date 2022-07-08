import { Router } from 'express';
import newOrder from '../controllers/ordersController.js';

const ordersRouter = Router();

ordersRouter.post('/order', newOrder);

export default ordersRouter;
