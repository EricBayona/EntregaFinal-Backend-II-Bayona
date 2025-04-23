import { authServices } from "../services/auth.services.js";

class AuthController {
    async login(req, res) {
        try {
            const { user, token } = await authServices.login(req.user)
            res.cookie("token", token, { httpOnly: true })
            res.status(200).json({ status: "ok", user, token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
    async register(req, res) {
        try {
            const user = await authServices.register(req.user);
            res.status(201).json({ message: user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }

    async current(req, res) {
        try {
            const result = await authServices.current(req.user, req.cookies.token);
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }

    async logout(req, res) {
        try {
            const result = await authServices.logout();
            res.clearCookie("token");
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
}

export const authController = new AuthController();