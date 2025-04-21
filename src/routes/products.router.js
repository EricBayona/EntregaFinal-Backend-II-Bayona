import { Router } from "express";
import { productControler } from "../controllers/product.controller.js";
import { validateSchema } from "../middlewares/validateSchema.midelleware.js";
import { createProductSchema, editProductSchema } from "../schemas/products.schema.js";
import { authRole } from "../middlewares/authRole.middlewares.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";




const router = Router();


router.get("/", productControler.getAllProducts);

router.get("/:pid", productControler.getProductById);

router.post("/", passportCall("jwt"), authRole(["admin"]), validateSchema({ body: createProductSchema }), productControler.createProduct);

router.put("/:pid", passportCall("jwt"), authRole(["admin"]), validateSchema(editProductSchema), productControler.updateProduct)

router.delete("/:pid", passportCall("jwt"), authRole(["admin"]), productControler.deletProduct);

export default router;
