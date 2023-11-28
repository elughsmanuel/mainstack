import express from 'express';
import {
    authenticate,
    isAdmin,
} from '../../middleware/authMiddleware';
import { 
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/create-product', authenticate, isAdmin, createProduct);
productRouter.get('/', authenticate, getAllProducts);
productRouter.get('/:productId', authenticate, getProductById);
productRouter.patch('/update-product/:productId', authenticate, isAdmin, updateProduct);
productRouter.delete('/delete-product/:productId', authenticate, isAdmin, deleteProduct);

export default productRouter;
