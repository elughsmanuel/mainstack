import express from 'express';
import { 
    authenticate, 
    isAdmin, 
    isSuperAdmin,
} from '../../middleware/authMiddleware';
import { 
    getAllUsers,
    getUserById,
    getMyProfile,
    updateMyProfile,
    updateMyPassword,
    deleteMe,
    updateUser,
    updateUserRole,
    deleteUser,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', authenticate, isAdmin, getAllUsers);
userRouter.get('/get-user/:userId', authenticate, isAdmin, getUserById);
userRouter.get('/profile/:userId', authenticate, getMyProfile);
userRouter.patch('/update-profile/:userId', authenticate, updateMyProfile);
userRouter.patch('/update-password/:userId', authenticate, updateMyPassword);
userRouter.delete('/delete-me/:userId', authenticate, deleteMe);
userRouter.patch('/update-user/:userId', authenticate, isAdmin, updateUser);
userRouter.patch('/update-user-role/:userId', authenticate, isSuperAdmin, updateUserRole);
userRouter.delete('/delete-user/:userId', authenticate, isSuperAdmin, deleteUser);

export default userRouter;
