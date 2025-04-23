import { productDao } from "../presistence/mongo/dao/product.dao.js";

class ProductService {
    async createProduct(productData) {
        try {
            const product = await productDao.create(productData);
            return product;
        } catch (error) {
            if (error.code === 11000 && error.keyPattern?.code) {
                throw new Error("Ya existe un producto con ese código.");
            }
            throw new Error("Error al crear el producto.");
        }
    }
    async getAllProducts(queryParams) {
        const { limit, page, sort, category, status } = queryParams;

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            learn: true,
        };
        try {
            if (category) {
                return await productDao.getAll({ category }, options);
            }

            if (status) {
                return await productDao.getAll({ status }, options);
            }

            return await productDao.getAll({}, options);
        } catch (error) {
            throw new Error("Error al obtener los productos.");
        }
    }
    async getProductById(queryParams) {
        const { pid } = queryParams;
        try {
            const product = await productDao.getById(pid);
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            throw new Error(error.message || "Error al encontrar el producto");
        }
    }
    async deletProduct(reqParams) {
        const { pid } = reqParams;
        try {
            const product = await productDao.findByIdAndDelete(pid);
            if (!product) throw new Error("Producto no encontrado");
            return product;
        } catch (error) {
            throw new Error(error.message || "Error al encontrar el producto");
        }
    }
    async updateProduct(reqParams, productData) {
        const { pid } = reqParams;
        try {
            const product = await productDao.update(pid, productData);
            if (!product) throw new Error("Producto no encontrado");
            return product;

        } catch (error) {
            if (error.code === 1100 && error.keyPattern?.code) {
                throw new Error("Ya existe un producto con ese código");
            }
            throw new Error(error.message || "Error al actualizar el producto");
        }
    }
}
export const productService = new ProductService();