export class productQuery {
    static buildProductQuery(
        category?: string,
        minPrice?: number,
        maxPrice?: number,
        minQuantity?: number,
        maxQuantity?: number,
    ): any {
        const query: any = {};

        if (category) {
          query.category = category;
        }
    
        if (minPrice !== undefined) {
          query.price = query.price || {};
          query.price.$gte = minPrice;
        }
    
        if (maxPrice !== undefined) {
          query.price = query.price || {};
          query.price.$lte = maxPrice;
        }
    
        if (minQuantity !== undefined) {
          query.quantity = query.quantity || {};
          query.quantity.$gte = minQuantity;
        }
    
        if (maxQuantity !== undefined) {
          query.quantity = query.quantity || {};
          query.quantity.$lte = maxQuantity;
        }

        return query;
    }

    static buildSortOptions(
        sortBy?: string,
        sortOrder?: string,
    ) : any {
        const sortOptions: any = {};
    
        if (sortBy) {
          const validSortFields = ['price', 'quantity'];
          if (validSortFields.includes(sortBy)) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
          }
        }

        return sortOptions;
    }
}
