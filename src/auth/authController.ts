import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { signUpSchema } from './authSchema';
import { schemaErrorHandler } from '../errors/schemaErrorHandler';
import AuthService from './authService';
import UserRepository from '../users/userRepository';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export const signUp = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
    const schema = await signUpSchema.validateAsync(req.body);

    const signUp = await authService.signUp(schema);

    res.status(StatusCodes.OK).json(signUp);
    } catch (error) {
        const errorMessage = schemaErrorHandler(error);

        if (errorMessage) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                data: errorMessage,
            });
        } else {
            next(error);
        }
    }
};
