import { productDao } from "../presistence/mongo/dao/product.dao.js";
import { cartServices } from "../services/cart.services.js";


class CartController {
    async createCart(req, res) {
        try {
            const cart = await cartServices.createCart();

            res.status(201).json({ status: "ok", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", msg: "Error interno del servidor" })

        }
    }
    async getCartByID(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartServices.getCartById(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

            res.status(200).json({ status: "ok", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }
    async addProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const product = await productDao.getById(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
            const cartUpdate = await cartServices.addProductToCart(cid, pid);

            res.status(200).json({ status: "ok", payload: cartUpdate });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }
    async deleteProductToCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const product = await productDao.getById(pid);
            if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });

            const cartUpdate = await cartServices.deleteProductToCart(cid, pid);

            res.status(200).json({ status: "ok", payload: cartUpdate });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }
    async updateQuantityProductInCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));

            res.status(200).json({ status: "ok", payload: cartUpdate });
        } catch (error) {
            console.log(error.message);
            const status = error.statusCode || 500
            res.status(500).json({ status: "Erro", msg: error.message });
        }
    }
    async clearProductsToCart(req, res) {
        try {
            const { cid } = req.params;
            const cart = await cartServices.clearProductsToCart(cid);
            if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

            res.status(200).json({ status: "ok", cart });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }
    async getAllCarts(req, res) {
        try {
            const carts = await cartServices.getAllCart();
            res.status(200).json({ status: "ok", carts })

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }
}

export const cartController = new CartController();