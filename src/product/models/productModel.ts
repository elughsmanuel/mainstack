import mongoose, { Document, Schema } from 'mongoose';
import { 
    NAME_REQUIRED,
    DESCRIPTION_REQUIRED,
    PRICE_REQUIRED,
    CATEGORY_REQUIRED,
    QUANTITY_REQUIRED,
    ADMIN_ID_REQUIRED,
 } from '../utils/constants';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    quantity: string;
    adminId: string;
}

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, NAME_REQUIRED],
        },
        description: {
            type: String,
            required: [true, DESCRIPTION_REQUIRED],
        },
        price: {
            type: Number,
            required: [true, PRICE_REQUIRED],
        },
        category: {
            type: String,
            required: [true, CATEGORY_REQUIRED],
        },
        quantity: {
            type: Number,
            required: [true, QUANTITY_REQUIRED],
        },
        adminId: {
            type: String,
            required: [true, ADMIN_ID_REQUIRED],
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
