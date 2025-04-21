import { Router } from "express";
import { userExist } from "../middlewares/existUser.middleware.js";
import { userController } from "../controllers/user.controller.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authRole } from "../middlewares/authRole.middlewares.js";
import { validateSchema } from "../middlewares/validateSchema.midelleware.js";
import { editUserShema } from "../schemas/editUser.schema.js";

const router = Router();

router.get("/", passportCall("jwt"), authRole(["admin"]), userController.getAllUser);

router.get("/:id", passportCall("jwt"), authRole(["admin"]), userExist, userController.getUserById);

router.delete("/:id", passportCall("jwt"), authRole(["admin"]), userExist, userController.deleteUserById);

router.put("/:id", validateSchema({ body: editUserShema }), passportCall("jwt"), authRole(["admin"]), userExist, userController.updateUserById);

export default router;
