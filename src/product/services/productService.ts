import ProductRepository from '../repositories/productRepository';

class ProductService {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async createProduct(userId: string, data: any) {
        const product = await this.productRepository.createProduct(userId, data);

        return { 
            success: true, 
            data: product,
        }
    }
}

export default ProductService;
