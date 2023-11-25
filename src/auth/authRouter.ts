import express from 'express';
import { 
    signUp,
    login,
} from './authController';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', login);

export default authRouter;
