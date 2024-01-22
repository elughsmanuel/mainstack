import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
    productId: string;
    quantity: string;
    userId: string;
}

const cartItemSchema = new Schema(
    {
        productId: {
            type: String,
            required: [true, 'PRODUCT ID REQUIRED'],
        },
        quantity: {
            type: Number,
            required: [true, 'QUANTITY REQUIRED'],
        },
    },
);

const cartSchema = new Schema(
    {
        userId: {
            type: String,
            required: [true, 'USER ID REQUIRED'],
        },
        cartItems: [cartItemSchema],
    },
    {
        timestamps: true,
    },
);

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;
