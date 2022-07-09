import { Router } from 'express';
import authRouter from './authRouter.js';
import productsRouter from './productsRouter.js';
import ordersRouter from './ordersRouter.js';

const router = Router();

router.use(authRouter);
router.use(productsRouter);
router.use(ordersRouter);

export default router;
