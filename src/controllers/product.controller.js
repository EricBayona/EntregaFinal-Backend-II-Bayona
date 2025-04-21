import { productService } from "../services/product.service.js";
class ProductController {
    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json({ status: "ok", product });
        } catch (error) {
            console.log(error);

            if (error.message.includes("Ya existe")) {
                return res.status(400).json({ status: "error", msg: error.message });
            }
            res.status(500).json({ status: "error", msg: "Error interno del servidor" });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts(req.query);
            res.status(200).json({ status: "ok", products })

        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params);
            res.status(200).json({ status: "ok", product });
        } catch (error) {
            console.log(error);
            if (error.message === "Producto no encontrado") {
                return res.status(404).json({ status: "Error", msg: error.message });
            }
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }
    async deletProduct(req, res) {
        try {
            const product = await productService.deletProduct(req.params);
            res.status(200).json({ status: "ok", message: "Producto eliminado" });
        } catch (error) {
            console.log(error);
            if (error.message === "Producto no encontrado") {
                return res.status(404).json({ status: "Error", msg: error.message });
            }
            res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await productService.updateProduct(req.params, req.body);
            res.status(200).json({ status: "ok", product });
        } catch (error) {
            console.log(error);
            if (error.message === "Ya existe un producto con ese código.") {
                return res.status(400).json({
                    status: "error",
                    msg: error.message
                });
            }

            if (error.message === "Producto no encontrado") {
                return res.status(404).json({
                    status: "error",
                    msg: error.message
                });
            }

            res.status(500).json({ status: "error", msg: "Error interno del servidor" });
        }
    }

}

export const productControler = new ProductController();