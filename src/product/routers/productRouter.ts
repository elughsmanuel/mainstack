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
    searchProduct
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.post('/create-product', authenticate, isAdmin, createProduct);
productRouter.get('/', authenticate, getAllProducts);
productRouter.get('/get-product/:productId', authenticate, getProductById);
productRouter.patch('/update-product/:productId', authenticate, isAdmin, updateProduct);
productRouter.delete('/delete-product/:productId', authenticate, isAdmin, deleteProduct);
productRouter.get('/search-product', authenticate, searchProduct); 

export default productRouter;
