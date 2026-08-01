import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres")
}).strict()

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(1, "La contraseña es requerida")
}).strict()

export const validateRegister = (data) => registerSchema.safeParse(data)
export const validateLogin = (data) => loginSchema.safeParse(data)