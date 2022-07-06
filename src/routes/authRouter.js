import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import signUpValidationMiddleware from '../middlewares/signUpValidationMiddleware.js';
import signInValidationMiddleware from '../middlewares/signInValidationMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-up', signUpValidationMiddleware, signUp);
authRouter.post('/sign-in', signInValidationMiddleware, signIn);

export default authRouter;
