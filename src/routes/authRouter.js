import { Router } from 'express';
import { signUp, signIn, signOut } from '../controllers/authController.js';
import signUpValidationMiddleware from '../middlewares/signUpValidationMiddleware.js';
import signInValidationMiddleware from '../middlewares/signInValidationMiddleware.js';
import tokenValidationMiddleware from '../middlewares/tokenValidationMiddleware.js';

const authRouter = Router();

authRouter.post('/sign-up', signUpValidationMiddleware, signUp);
authRouter.post('/sign-in', signInValidationMiddleware, signIn);
authRouter.post('/sign-out', tokenValidationMiddleware, signOut);

export default authRouter;
