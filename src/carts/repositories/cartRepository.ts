import Cart, { ICart } from '../models/cartModel';

class CartRepository {
    async createCart(userId: string, data: any): Promise<ICart> {
        const cart = await Cart.create({
            userId: userId,
            ...data,
        });

        return cart;
    }
}

export default CartRepository;
