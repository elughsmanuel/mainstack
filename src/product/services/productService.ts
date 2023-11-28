import ProductRepository from '../repositories/productRepository';
import BadRequest from '../../errors/BadRequest';
import {
    PRODUCT_NOT_FOUND,
    PRODUCT_DELETED
} from '../utils/constants';
import { productQuery } from '../utils/productQuery';

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

    async getAllProducts(
        category?: string,
        minPrice?: number,
        maxPrice?: number,
        minQuantity?: number,
        maxQuantity?: number,
        sortBy?: string,
        sortOrder?: string,
        fields?: string[],
    ) {

        const query = productQuery.buildProductQuery(
            category,
            minPrice,
            maxPrice,
            minQuantity,
            maxQuantity,
        );

        const sortOptions = productQuery.buildSortOptions(
            sortBy,
            sortOrder,
        );

        const selectFields = fields ? fields : undefined;
        
        const products = await this.productRepository.getAllProducts(query, sortOptions, selectFields);

        return {
            status: true,
            results: products.length,
            data: products,
        }
    }

    async getProductById(productId: string) {
        const product = await this.productRepository.getProductById(productId);

        return {
            status: true,
            data: product,
        }
    }

    async updateProduct(productId: string, data: any) {
        const product = await this.productRepository.getProductById(productId);

        if(!product) {
            throw new BadRequest(PRODUCT_NOT_FOUND);
        }

        const updatedUser = await this.productRepository.updateProduct(productId, data);

        return {
            status: true,
            data: updatedUser,
        }
    }

    async deleteProduct(productId: string) {
        const product = await this.productRepository.getProductById(productId);

        if(!product) {
            throw new BadRequest(PRODUCT_NOT_FOUND);
        }

        await this.productRepository.findByIdAndDelete(productId);

        return {
            status: true,
            data: PRODUCT_DELETED,
        }
    }
}

export default ProductService;
