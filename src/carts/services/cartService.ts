import CartRepository from '../repositories/cartRepository';

class CartService {
    private cartRepository: CartRepository;

    constructor(cartRepository: CartRepository) {
        this.cartRepository = cartRepository;
    }

    async createCart(userId: string, data: any) {
        const cart = await this.cartRepository.createCart(userId, data);

        return { 
            success: true, 
            data: cart,
        }
    }
}

export default CartService;
