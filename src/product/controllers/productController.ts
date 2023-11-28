import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { 
    createProductSchema,
    updateProductSchema,
} from '../../validators/productSchema';
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

export const getAllProducts = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            page,
            perPage,
            category, 
            minPrice, 
            maxPrice, 
            minQuantity, 
            maxQuantity, 
            sortBy, 
            sortOrder, 
            fields,
        } = req.query;

        const products = await productService.getAllProducts(
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
            category as string,
            parseFloat(minPrice as string) || undefined,
            parseFloat(maxPrice as string) || undefined,
            parseFloat(minQuantity as string) || undefined,
            parseFloat(maxQuantity as string) || undefined,
            sortBy as string,
            sortOrder as string,
            fields ? (fields as string).split(',') : undefined,
        );

        return res.status(StatusCodes.OK).json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;

        const product = await productService.getProductById(productId);

        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;

        const schema = await updateProductSchema.validateAsync(req.body);

        const product = await productService.updateProduct(
            productId, 
            schema,
        );

        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;

        const product = await productService.deleteProduct(
            productId, 
        );

        return res.status(StatusCodes.OK).json(product);
    } catch (error) {
        next(error);
    }
};

export const searchProduct = async (
    req: Request, 
    res: Response,
    next: NextFunction,
) => {
    try {
        const { 
            search,
            page,
            perPage,
        } = req.query;

        const products = await productService.searchProduct(
            search as string,
            parseFloat(page as string) || '1',
            parseFloat(perPage as string || '10'),
        );

        return res.status(StatusCodes.OK).json(products);
    } catch (error) {
        next(error);
    }
};
