import express from 'express';
import { 
    signUp,
    login,
    forgotPassword,
    resetPassword,
} from './authController';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

export default authRouter;
