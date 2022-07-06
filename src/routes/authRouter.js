import { Router } from 'express';
import signUp from '../controllers/authController.js';
import signUpValidationMiddleware from '../middlewares/signUpValidationMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-up', signUpValidationMiddleware, signUp);

export default authRouter;
