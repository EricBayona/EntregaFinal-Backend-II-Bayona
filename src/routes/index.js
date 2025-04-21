import { Router } from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import cartRouter from "./carts.router.js";
import productRouter from "./products.router.js";


const router = Router();

router.use("/users", userRouter);
router.use("/sessions", authRouter);
router.use("/cart", cartRouter);
router.use("/products", productRouter);

export default router;
