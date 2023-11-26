import express from 'express';
import { authenticate, isAdmin  } from '../middleware/authMiddleware';
import { 
    getAllUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
    updateMyPassword,
    deleteMe,
    updateUser,
} from './userController';

const userRouter = express.Router();

userRouter.get('/', authenticate, isAdmin, getAllUsers);
userRouter.get('/:userId', authenticate, isAdmin, getUserById);
userRouter.get('/profile/:userId', authenticate, getMyProfile);
userRouter.patch('/update-profile/:userId', authenticate, updateMyProfile);
userRouter.patch('/update-password/:userId', authenticate, updateMyPassword);
userRouter.delete('/delete-me/:userId', authenticate, deleteMe);
userRouter.patch('/update-user/:userId', authenticate, isAdmin, updateUser);

export default userRouter;
