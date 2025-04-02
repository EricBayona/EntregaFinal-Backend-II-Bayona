import { Router } from "express";
import { authRole } from "../middlewares/authRole.middlewares.js";
import { createToken } from "../utils/jwt.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";


const router = Router();

router.post("/login", passportCall("login"), async (req, res) => {
    try {
        const tokenData = {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role,
        };
        const token = createToken(tokenData);
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ user: req.user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});


router.post("/register", passportCall("register"), async (req, res) => {
    try {
        res.status(201).json({ message: req.user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });

    }
})

router.get("/current", passportCall("jwt"), authRole(["admin", "user"]), async (req, res) => {
    try {
        res.status(200).json({ message: "Estas logueado", user: req.user })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

router.get("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({ message: "Session cerrada" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
});

export default router;