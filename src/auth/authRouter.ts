import express from 'express';
import { 
    signUp,
    login,
    forgotPassword,
} from './authController';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);

export default authRouter;
