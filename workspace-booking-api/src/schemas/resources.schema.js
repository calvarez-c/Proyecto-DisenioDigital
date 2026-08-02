import {z} from 'zod'

const createResourceSchema = z.object({
    name: z.string().min(3, "El nombre debe tener por lo menos 3 caracteres."),
    description: z.string().optional(),
    capacity: z.number().int().positive("Este dato debe ser un número positivo."),
    price_per_hour: z.number().positive("El precio debe ser un número positivo.")
}).strict()

const updateResourceSchema = z.object({
    name: z.string().min(3, "El nombre debe tener por lo menos 3 caracteres.").optional(),
    description: z.string().optional(),
    capacity: z.number().int().positive("Este dato debe ser un número positivo.").optional(),
    price_per_hour: z.number().positive("El precio debe ser un número positivo.").optional(),
    is_active: z.boolean().optional()
}).strict()

export const validateCreateResource = (data) => createResourceSchema.safeParse(data)
export const validateUpdateResource = (data) => updateResourceSchema.safeParse(data)