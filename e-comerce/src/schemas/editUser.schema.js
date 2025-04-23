import { z } from "zod";

export const editUserShema = z.object({
    first_name: z.string().nonempty().min(3).optional(),
    last_name: z.string().nonempty().min(3).optional(),
    email: z.string().email().optional(),
    birthDate: z.date().optional(),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[\W_]).{8,20}$/, {
        message: "La contraseña debe tener entre 8 y 20 caracteres, al menos una mayúscula y un carácter especial"
    }).optional(),
    role: z.enum(["user", "admin"]).optional(),
})