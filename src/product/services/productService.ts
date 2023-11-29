import ProductRepository from '../repositories/productRepository';
import BadRequest from '../../errors/BadRequest';
import {
    PRODUCT_NOT_FOUND,
    PRODUCT_DELETED
} from '../utils/constants';
import { productQuery } from '../utils/productQuery';
import { searchQuery } from '../utils/productQuery';

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
        page: any,
        perPage: any,
        category?: string,
        minPrice?: number,
        maxPrice?: number,
        minQuantity?: number,
        maxQuantity?: number,
        sortBy?: string,
        sortOrder?: string,
        fields?: string[],
    ) {

        // Build the query for filtering products
        const query = productQuery.buildProductQuery(
            category,
            minPrice,
            maxPrice,
            minQuantity,
            maxQuantity,
        );

        // Build options for sorting products
        const sortOptions = productQuery.buildSortOptions(
            sortBy,
            sortOrder,
        );

        const selectFields = fields ? fields : undefined;

        const count = await this.productRepository.getTotalProductCount(query);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);
        
        const products = await this.productRepository.getAllProducts(query, sortOptions, skip, perPage, selectFields);

        return {
            status: true,
            results: products.length,
            data: products,
            currentPage: currentPage,
            totalPages: totalPages,
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

    async searchProduct(
        search: string,
        page: any,
        perPage: any,
    ) {

        // Build the search query
        const query = searchQuery.searchProductQuery(
            search,
        );

        const count = await this.productRepository.searchTotalProductCount(query);

        // Calculate pagination values
        const skip = (page - 1) * perPage;
        const currentPage = Math.ceil(page);
        const totalPages = Math.ceil(count / perPage);
        
        const products = await this.productRepository.searchProduct(query, skip, perPage);

        return {
            status: true,
            results: products.length,
            data: products,
            currentPage: currentPage,
            totalPages: totalPages,
        }
    }
}

export default ProductService;
