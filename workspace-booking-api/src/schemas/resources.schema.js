import {z} from 'zod'

const createResourceSchema = z.object({
    name: z.string().min(3, "El nombre debe tener por lo menos 3 caracteres."),
    description: z.string().optional(),
    capacity: z.number().int().positive("Este dato debe ser un número positivo."),
    price_per_hour: z.number().positive("El precio debe ser un número posivivo.")
}).strict()
