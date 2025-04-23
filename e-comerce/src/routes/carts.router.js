import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authRole } from "../middlewares/authRole.middlewares.js";
import { authCartOwner } from "../middlewares/authCartOwner.middleware.js";



const router = Router();

router.post("/", passportCall("jwt"), authRole(["admin"]), cartController.createCart);

router.get("/mycart", passportCall("jwt"), authRole(["user"]), cartController.getMyCart);

router.get("/:cid", passportCall("jwt"), authRole(["admin"]), cartController.getCartByID);

router.post("/:cid/product/:pid", passportCall("jwt"), authRole(["user"]), authCartOwner, cartController.addProductToCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authRole(["user"]), authCartOwner, cartController.deleteProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authRole(["user"]), authCartOwner, cartController.updateQuantityProductInCart);

router.delete("/:cid", passportCall("jwt"), authRole(["user"]), authCartOwner, cartController.clearProductsToCart);

router.get("/", passportCall("jwt"), authRole(["admin"]), cartController.getAllCarts);

router.get("/:cid/purchase", passportCall("jwt"), authRole(["user"]), authCartOwner, cartController.purchaseCart);



export default router;
