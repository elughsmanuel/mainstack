import express from 'express';
import { authenticate, isAdmin  } from '../middleware/authMiddleware';
import { 
    getAllUsers,
    getUserById,
} from './userController';

const userRouter = express.Router();

userRouter.get('/', authenticate, isAdmin, getAllUsers);
userRouter.get('/:userId', authenticate, isAdmin, getUserById);

export default userRouter;
