import { Request, Response, NextFunction } from 'express'; 
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction,
) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(err.message);
        console.log(err.stack);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err.message,
            stack: err.stack,
        });
    } 
    else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Something went wrong.',
        });
    }
};
