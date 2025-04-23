import { Router } from "express";
import { authRole } from "../middlewares/authRole.middlewares.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authController } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.midelleware.js";
import { registerSchema } from "../schemas/register.schema.js";
import { loginSchema } from "../schemas/login.schema.js";


const router = Router();

router.post("/login", validateSchema({ body: loginSchema }), passportCall("login"), authController.login);

router.post("/register", validateSchema({ body: registerSchema }), passportCall("register"), authController.register)

router.get("/current", passportCall("jwt"), authRole(["admin", "user"]), authController.current);

router.get("/logout", passportCall("jwt"), authController.logout);

export default router;