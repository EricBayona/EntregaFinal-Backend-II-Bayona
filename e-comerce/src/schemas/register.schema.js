import { z } from "zod";

export const registerSchema = z.object({
    first_name: z.string().nonempty().min(3),
    last_name: z.string().nonempty().min(3),
    email: z.string().email(),
    birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Debe tener el formato YYYY-MM-DD" })
        .transform((val) => new Date(val))
        .refine((val) => val instanceof Date && !isNaN(val), {
            message: "Debe ser una fecha válida",
        }),
    password: z.string().regex(/^(?=.*[A-Z])(?=.*[\W_]).{8,20}$/, {
        message: "La contraseña debe tener entre 8 y 20 caracteres, al menos una mayúscula y un carácter especial"
    }),
    role: z.enum(["user", "admin"]).optional(),
});
