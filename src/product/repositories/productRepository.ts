import Product, { IProduct } from '../models/productModel';

class ProductRepository {
    async createProduct(userId: string, data: any): Promise<IProduct> {
        const product = await Product.create({
            adminId: userId,
            ...data,
        });

        return product;
    }
}

export default ProductRepository;
