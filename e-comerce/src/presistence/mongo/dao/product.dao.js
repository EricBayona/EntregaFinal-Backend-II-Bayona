import { productModel } from "../models/product.model.js";


class ProductDao {
    async getAll(query, options) {
        const products = await productModel.paginate(query, options);
        return products;
    }

    async getById(id) {
        const product = await productModel.findById(id);
        return product;
    }

    async create(data) {
        return await productModel.create(data);
    }

    async update(id, data) {
        const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
        return productUpdate;
    }

    async deleteOne(id) {
        const product = await productModel.deleteOne(id);
        return product;
    }
    async findByIdAndDelete(id) {
        const product = await productModel.findByIdAndDelete(id);
        return product;

    }
}

export const productDao = new ProductDao();