import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/userService';
import UserRepository from '../repositories/userRepository';
import { 
    updateUserSchema,
    updatePasswordSchema,
    updateUserRoleSchema,
 } from '../../validators/schema';

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const getAllUsers = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
            role,
        } = req.query;
        const users = await userService.getAllUsers(
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
            role as string,
        );

        return res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (
    req: Request, 
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
    req: Request & {userId?: string}, 
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
    req: Request & {userId?: string}, 
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
    req: Request & {userId?: string}, 
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
    req: Request & {userId?: string}, 
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

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const schema = await updateUserSchema.validateAsync(req.body);

        const user = await userService.updateUser(
            userId, 
            schema,
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const updateUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const schema = await updateUserRoleSchema.validateAsync(req.body);

        const user = await userService.updateUserRole(
            userId, 
            schema,
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { userId } = req.params;

        const user = await userService.deleteUser(
            userId, 
        );

        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        next(error);
    }
};
