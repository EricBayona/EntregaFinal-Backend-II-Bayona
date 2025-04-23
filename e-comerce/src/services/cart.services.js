import { cartDao } from "../presistence/mongo/dao/cart.dao.js";
import { productDao } from "../presistence/mongo/dao/product.dao.js";

class CartServices {
    async createCart() {
        return await cartDao.create();
    }
    async getCartById(id) {
        return await cartDao.getById(id);
    }
    async getAllCart() {
        return await cartDao.getAll();
    }
    async getCartUpdateById(id, data) {
        return await cartDao.update(id, data);
    }
    async getCartDeleteOne(id) {
        return await cartDao.deleteOne(id);
    }
    async addProductToCart(cid, pid) {
        const cart = await cartDao.getById(cid);
        if (!cart) throw new Error("Carrito no encontrado");


        const productInCart = cart.products.find((element) => element.product._id.toString() === pid);
        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        const cartUpdate = await cartDao.update(cid, { products: cart.products });
        return cartUpdate;
    }
    async deleteProductToCart(cid, pid) {
        const cart = await cartDao.getById(cid);
        if (!cart) throw new Error("Carrito no encontrado");

        cart.products = cart.products.filter((element) => element.product._id.toString() != pid);

        const cartUpdate = await cartDao.update(cid, { products: cart.products });
        return cartUpdate;
    }
    async updateQuantityProductInCart(cid, pid, quantity) {
        const cart = await cartDao.getById(cid);
        if (!cart) {
            const error = new Error("Carrito no encontrado");
            error.statusCode = 404;
            throw error;
        }

        const product = await productDao.getById(pid);
        if (!product) {
            const error = new Error("Producto no encontrado");
            error.statusCode = 404;
            throw error;
        }


        const productInCart = cart.products.find((element) => element.product._id.toString() == pid);
        if (!productInCart) {
            const error = new Error("Producto en Carrito no encontrado");
            error.statusCode = 404;
            throw error;
        }
        productInCart.quantity = quantity;

        const cartUpdate = await cartDao.update(cid, { products: cart.products });
        return cartUpdate;
    }
    async clearProductsToCart(cid) {
        const cartUpdate = await cartDao.update(cid, { products: [] });
        return cartUpdate;
    }
}

export const cartServices = new CartServices();