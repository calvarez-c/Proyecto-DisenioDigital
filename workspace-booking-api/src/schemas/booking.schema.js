
import { z } from 'zod'

const bookingSchema = z.object({
    resource_id: z.int(),
    start_time: z.iso.datetime({ local: true },"El valor de inicio debe ser de tipo fecha"),
    end_time: z.iso.datetime({ local: true }, "El valor de fin debe ser de tipo fecha")
}).strict()


export const validateBooking = (data) => bookingSchema.safeParse(data)
