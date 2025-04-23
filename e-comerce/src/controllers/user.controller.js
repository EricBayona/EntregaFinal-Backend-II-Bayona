import { userService } from "../services/user.services.js";

class UserController {
    async getAllUser(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json({ status: "ok", users });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json({ status: "ok", user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
    async deleteUserById(req, res) {
        try {
            await userService.deleteUserById(req.params.id)
            res.status(200).json({ status: "ok", message: `User id ${req.params.id} remove` });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
    async updateUserById(req, res) {
        try {
            const userUpdate = await userService.updateUserById(req.params.id, req.body);
            res.status(200).json({ status: "ok", userUpdate });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    }
}

export const userController = new UserController();