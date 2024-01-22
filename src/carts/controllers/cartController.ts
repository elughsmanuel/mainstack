import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    createCartSchema,
} from '../../validators/cartSchema';
import CartService from '../services/cartService';
import CartRepository from '../repositories/cartRepository';

const cartRepository = new CartRepository();
const cartService = new CartService(cartRepository);

export const createCart = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await createCartSchema.validateAsync(req.body);

        const createCart = await cartService.createCart(
            String(req.userId),
            schema,
        );

        return res.status(StatusCodes.OK).json(createCart);
    } catch (error) {
        next(error);
    }
};
