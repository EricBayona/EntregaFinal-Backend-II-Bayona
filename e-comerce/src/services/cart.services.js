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
    // async purchaseCart(cid) {
    //     const cart = await cartDao.getById(cid);

    //     let total = 0;
    //     const products = [];
    //     for (const productCart of cart.products) {
    //         const prod = await productDao.getById(productCart.product);
    //         if (prod.stock >= productCart.quantity) {
    //             total += prod.price * productCart.quantity;
    //             await productDao.update(prod._id, { stock: prod.stock - productCart.quantity });
    //         } else {
    //             products.push(productCart);
    //         }
    //         await cartDao.update(cid, { products });
    //     }
    //     return total;
    // }
    async purchaseCart(cid) {
        const cart = await cartDao.getById(cid);
        if (!cart) throw new Error(`Carrito con id ${cid} no encontrado`);

        let total = 0;
        const remainingProducts = []; // productos que no se pudieron comprar

        for (const productCart of cart.products) {
            const prod = await productDao.getById(productCart.product);

            if (!prod) continue; // si el producto no existe, lo ignora

            if (prod.stock >= productCart.quantity) {
                total += prod.price * productCart.quantity;

                // Descuenta el stock
                await productDao.update(prod._id, {
                    stock: prod.stock - productCart.quantity,
                });
            } else {
                // Guarda los productos que no se pudieron comprar
                remainingProducts.push(productCart);
            }
        }

        // Actualiza el carrito con los productos que no se pudieron comprar
        await cartDao.update(cid, { products: remainingProducts });

        // Devuelve el total y la lista de productos no comprados
        return {
            total,
            productsNotPurchased: remainingProducts,
        };
    }

}

export const cartServices = new CartServices();