import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authRole } from "../middlewares/authRole.middlewares.js";



const router = Router();

router.post("/", passportCall("jwt"), authRole(["user"]), cartController.createCart);

router.get("/:cid", passportCall("jwt"), authRole(["user", "admin"]), cartController.getCartByID);

router.post("/:cid/product/:pid", passportCall("jwt"), authRole(["user"]), cartController.addProductToCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authRole(["user"]), cartController.deleteProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authRole(["user"]), cartController.updateQuantityProductInCart);

router.delete("/:cid", passportCall("jwt"), authRole(["user"]), cartController.clearProductsToCart);

router.get("/", passportCall("jwt"), authRole(["admin"]), cartController.getAllCarts);


export default router;
