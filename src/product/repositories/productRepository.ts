import Product, { IProduct } from '../models/productModel';

class ProductRepository {
    async createProduct(userId: string, data: any): Promise<IProduct> {
        const product = await Product.create({
            adminId: userId,
            ...data,
        });

        return product;
    }

    async getAllProducts(): Promise<IProduct[]> {
        const products = await Product.find();
        
        return products;
    }

    async getProductById(productId: string): Promise<IProduct | null> {
        const product = await Product.findById(productId);

        return product;
    }

    async updateProduct(productId: string, data: any): Promise<IProduct | null> {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: data },
            { new: true },
        );

        return updatedProduct;
    }

    async findByIdAndDelete(productId: string): Promise<IProduct | null> {
        const product = await Product.findByIdAndDelete(productId);

        return product;
    }
}

export default ProductRepository;
