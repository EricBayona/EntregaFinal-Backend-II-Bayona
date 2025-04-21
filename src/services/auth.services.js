import { createToken } from "../utils/jwt.js";

class AuthServices {
    async login(user) {
        const tokenData = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        try {
            const token = createToken(tokenData);
            return ({ user, token })
        } catch (error) {
            throw new Error("Error al generar el token");
        }
    }
    async register(userData) {
        return userData;
    }
    async current(user, token) {
        return {
            message: "Estás logueado",
            user,
            token
        };
    }

    async logout() {
        return { message: "Sesión cerrada" };
    }

}

export const authServices = new AuthServices();