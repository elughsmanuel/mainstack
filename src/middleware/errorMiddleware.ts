import { Request, Response, NextFunction } from 'express'; 
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import Unauthenticated from '../errors/Unauthenticated';
import BadRequest from '../errors/BadRequest';
import UnprocessableEntity from '../errors/UnprocessableEntity';
import { 
    UNIQUE_EMAIL,
    UNIQUE_USERNAME,
    UNIQUE_CONSTRAINT,
    VALIDATION_ERROR,
    VALIDATION_ERROR_CODE,
 } from '../auth/utils/constants';

export const errorMiddleware = (
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction,
) => {
    if (err instanceof Unauthenticated) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    if (err instanceof BadRequest) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    if (err instanceof UnprocessableEntity) {
        return res.status(err.statusCode).json({
            success: false,
            data: err.message,
        });
    }

    // Handle input/Joi validation errors
    if (err instanceof Joi.ValidationError) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            success: false,
            data: err.details[0].message,
        });
    }

    // Handle MongoDB unique constraint violation errors
    if (err.name === VALIDATION_ERROR && err.code === VALIDATION_ERROR_CODE) {
        const field = Object.keys(err.keyPattern)[0];

        if (field === 'email') {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                data: UNIQUE_EMAIL,
            });
        } else if (field === 'username') {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                data: UNIQUE_USERNAME,
            });
        } else {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                success: false,
                data: UNIQUE_CONSTRAINT,
            });
        }
    }

    // Handle MongoDB CastError for invalid ObjectID
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        const match = err.stack.match(/at path "_id" for model "(.*?)"/);
        const modelName = match ? match[1] : 'unknown';

        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            data: `Invalid ${modelName} ID`,
        });
    }

    // Handle errors in development by logging the stack
    if (process.env.NODE_ENV === 'development') {
        console.log(err.message);
        console.log(err.stack);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err.message,
            stack: err.stack,
        });
    }

    // Handle errors in production by sending a generic error message
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};
