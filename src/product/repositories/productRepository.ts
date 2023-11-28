import Product, { IProduct } from '../models/productModel';

class ProductRepository {
    async createProduct(userId: string, data: any): Promise<IProduct> {
        const product = await Product.create({
            adminId: userId,
            ...data,
        });

        return product;
    }

    async getAllProducts(query: any, sortOptions: any, skip: any, perPage: any, selectFields?: string[]): Promise<IProduct[]> {
        let queryBuilder = Product.find(query).sort(sortOptions).skip(skip).limit(perPage);

        if (selectFields) {
            const selectObject: { [key: string]: 1 } = {};
            selectFields.forEach(field => (selectObject[field] = 1));

            queryBuilder = queryBuilder.select(selectObject);
        }

        const products = await queryBuilder.exec();
        
        return products;
    }

    async getTotalProductCount(query: any): Promise<number> {

        return await Product.countDocuments(query).exec();
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
