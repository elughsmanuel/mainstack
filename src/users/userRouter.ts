import express from 'express';
import { authenticate, isAdmin  } from '../middleware/authMiddleware';
import { 
    getAllUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
    updateMyPassword,
} from './userController';

const userRouter = express.Router();

userRouter.get('/', authenticate, isAdmin, getAllUsers);
userRouter.get('/:userId', authenticate, isAdmin, getUserById);
userRouter.get('/profile/:userId', authenticate, getMyProfile);
userRouter.patch('/update-profile/:userId', authenticate, updateMyProfile);
userRouter.patch('/update-password/:userId', authenticate, updateMyPassword);

export default userRouter;
