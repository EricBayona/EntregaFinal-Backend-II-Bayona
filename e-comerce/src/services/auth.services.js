import { UserResponseDto } from "../dto/userResponse.dto.js";
import { createToken } from "../utils/jwt.js";

class AuthServices {
    async login(user) {
        const userDto = new UserResponseDto(user);
        const tokenData = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        try {
            const token = createToken(tokenData);
            return ({ user: userDto, token })
        } catch (error) {
            throw new Error("Error al generar el token");
        }
    }
    async register(userData) {
        return userData;
    }
    async current(user, token) {
        const userDto = new UserResponseDto(user)
        return {
            message: "Estás logueado",
            user: userDto,
            token
        };
    }

    async logout() {
        return { message: "Sesión cerrada" };
    }

}

export const authServices = new AuthServices();