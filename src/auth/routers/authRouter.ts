import express from 'express';
import { 
    signUp,
    login,
    forgotPassword,
    resetPassword,
    superAdmin,
} from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.patch('/reset-password', resetPassword);
authRouter.post('/super-admin', superAdmin);

export default authRouter;
