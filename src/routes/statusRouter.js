import { Router } from 'express';
import tokenValidationMiddleware from '../middlewares/tokenValidationMiddleware.js';
import updateStatus from '../controllers/statusController.js';

const statusRouter = Router();

statusRouter.post('/status', tokenValidationMiddleware, updateStatus);

export default statusRouter;
