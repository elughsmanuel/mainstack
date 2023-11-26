import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from './userService';
import UserRepository from '../users/userRepository';
import { 
    updateUserSchema,
    updatePasswordSchema,
 } from '../auth/authSchema';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const getAllUsers = async (
    req: Request & {user?: any}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (
    req: Request & {user?: any}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const user = await userService.getUserById(userId);

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = async (
    req: Request & {user?: any, userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await userService.getMyProfile(
            String(req.userId)
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateMyProfile = async (
    req: Request & {user?: any, userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await updateUserSchema.validateAsync(req.body);

        const user = await userService.updateMyProfile(
            String(req.userId),
            schema,
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateMyPassword = async (
    req: Request & {user?: any, userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await updatePasswordSchema.validateAsync(req.body);

        const user = await userService.updateMyPassword(
            String(req.userId),
            schema.password,
            schema.newPassword,
            schema.confirmPassword,
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteMe = async (
    req: Request & {user?: any, userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const user = await userService.deleteMe(
            String(req.userId)
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};
