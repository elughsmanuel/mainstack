import express from 'express';
import {
    authenticate,
    isAdmin,
} from '../../middleware/authMiddleware';
import { 
    createProduct,
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/create-product', authenticate, isAdmin, createProduct);

export default productRouter;
