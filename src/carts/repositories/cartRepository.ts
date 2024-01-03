import Cart, { ICart } from '../models/cartModel';

class CartRepository {
    async createCart(userId: string, data: any): Promise<ICart> {
        const cart = await Cart.create({
            userId: userId,
            cartItems: data.cartItems,
        });

        return cart;
    }
}

export default CartRepository;
