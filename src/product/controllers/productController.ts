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
        const query: any = {};

        if (req.query.category) {
          query.category = req.query.category;
        }

        if (req.query.minPrice) {
            if (query.price) {
                query.price.$gte = req.query.minPrice;
            } else {
                query.price = { $gte: req.query.minPrice };
            }
        }
          
        if (req.query.maxPrice) {
            if (query.price) {
                query.price.$lte = req.query.maxPrice;
            } else {
                query.price = { $lte: req.query.maxPrice };
            }
        }

        if (req.query.minQuantity) {
            if (query.quantity) {
                query.quantity.$gte = req.query.minQuantity;
            } else {
                query.quantity = { $gte: req.query.minQuantity };
            }
        }
          
        if (req.query.maxQuantity) {
            if (query.quantity) {
                query.quantity.$lte = req.query.maxQuantity;
            } else {
                query.quantity = { $lte: req.query.maxQuantity };
            }
        }

        const sortOptions: any = {};

        if (req.query.sortBy) {
          const validSortFields = ['price', 'quantity'];
          if (validSortFields.includes(req.query.sortBy as string)) {
            sortOptions[req.query.sortBy as string] = req.query.sortOrder === 'desc' ? -1 : 1;
          }
        }

        const selectFields = req.query.fields ? (req.query.fields as string).split(',') : undefined;    

        const products = await productService.getAllProducts(query, sortOptions, selectFields);

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
