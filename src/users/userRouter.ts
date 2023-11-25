import express from 'express';
import { authenticate, isAdmin  } from '../middleware/authMiddleware';
import { 
    getAllUsers,
    getUserById,
    getMyProfile,
} from './userController';

const userRouter = express.Router();

userRouter.get('/', authenticate, isAdmin, getAllUsers);
userRouter.get('/:userId', authenticate, isAdmin, getUserById);
userRouter.get('/profile/:userId', authenticate, getMyProfile);


export default userRouter;
