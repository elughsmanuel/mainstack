import express from 'express';
import { authenticate, isAdmin  } from '../middleware/authMiddleware';
import { 
    getAllUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
} from './userController';

const userRouter = express.Router();

userRouter.get('/', authenticate, isAdmin, getAllUsers);
userRouter.get('/:userId', authenticate, isAdmin, getUserById);
userRouter.get('/profile/:userId', authenticate, getMyProfile);
userRouter.patch('/update-profile/:userId', authenticate, updateMyProfile);

export default userRouter;
