
import { z } from 'zod'

const bookingSchema = z.object({
    resource_id: z.int(),
    start_time:  z.string().regex(
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
        "La fecha debe tener el formato YYYY-MM-DD HH:mm:ss"
    ),
    end_time:  z.string().regex(
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
        "La fecha debe tener el formato YYYY-MM-DD HH:mm:ss"
    )
}).strict()


export const validateBooking = (data) => bookingSchema.safeParse(data)
