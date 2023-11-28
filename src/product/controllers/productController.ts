import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createProductSchema } from '../../validators/productSchema';
import ProductService from '../services/productService';
import ProductRepository from '../repositories/productRepository';

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export const createProduct = async (
    req: Request & {userId?: string}, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const schema = await createProductSchema.validateAsync(req.body);

        const createProduct = await productService.createProduct(
            String(req.userId),
            schema,
        );

        return res.status(StatusCodes.OK).json(createProduct);
    } catch (error) {
        next(error);
    }
};
