import express from 'express';
import {
    authenticate,
} from '../../middleware/authMiddleware';
import { 
    createCart,
} from '../controllers/cartController';

const cartRouter = express.Router();

cartRouter.post('/create-cart', authenticate, createCart);

export default cartRouter;
