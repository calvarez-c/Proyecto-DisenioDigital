import jwt from 'jsonwebtoken'
import { jsonResponse } from '../helpers/json_response.js'
import { BookingModel } from '../models/booking.model.js'
import { validateBooking } from '../schemas/booking.schema.js'
import { start } from 'node:repl'
import { date_formatter } from '../helpers/date_formatter.js'

export class BookingController {

    static async getAllBookings(req, res) {
        
        const {id, role} = req.user
    
        try{

            if (role !== 'ADMIN') {
                return res.status(403).json(jsonResponse(403, "No tiene acceso al recurso"))
            }

            const bookings = await BookingModel.getAllBookings()

            return res.status(200).json(jsonResponse(200, `Todas las reservas`, bookings))
        
        } catch (error) {            
            return res.status(500).json(jsonResponse(500, "Error interno del servidor", error.message))
        }
    }



    static async getMyBookings(req, res) {
        
        const {id, role} = req.user
        

        try{

            if (role !== 'CLIENT') {
                return res.status(403).json(jsonResponse(403, "No tiene acceso al recurso"))
            }

            const bookings = await BookingModel.getMyBookings(id)

            return res.status(200).json(jsonResponse(200, `Reservas de usuario #${id}`, bookings))
        
        } catch (error) {            
            return res.status(500).json(jsonResponse(500, "Error interno del servidor", error.message))
        }
    }



//TODO >> validar formato de fecha UTC
    static async createBooking(req, res) {
            
        //Validacion con zod
        const validation = validateBooking(req.body)

        if (!validation.success) {
            return res.status(400).json(jsonResponse(400, validation.error.errors || validation.error.issues))
        }
        
        //Obtener datos y convertir iso a formato fecha
        const  resource_id  = validation.data.resource_id
        const  start_time  = new Date(validation.data.start_time)
        const  end_time  = new Date(validation.data.end_time)


        //Validar que las fechas de inicio y fin no tengan errores
        if (end_time < start_time  || start_time < new Date() ) {
            return res.status(400).json(jsonResponse(400, "La fecha de inicio debe ser menor que la fecha de fin y no puede ser una fecha pasada"))                
        }
        
        try {

            //Valida que las fechas no se solapen
            const formatted_start_time = date_formatter(start_time)
            const formatted_end_time = date_formatter(end_time)
            
            const overlap = await BookingModel.validateOverlap(resource_id, formatted_start_time, formatted_end_time)
            
            if (overlap ) {
                return res.status(400).json(jsonResponse(400, "Ya existe reserva dentro del mismo rango de tiempo", overlap))                
            }


            //Obtener precio total
            //TODO >> usar endpoint de resource cuando este listo
            const resource = await BookingModel.getResource(resource_id)

            if (!resource) {
                return res.status(400).json(jsonResponse(400, "El recurso que desea reservar no existe"))                
            }

            const duration = ( end_time - start_time )  / (1000 * 60 * 60)
            
            const total_price = resource.price_per_hour * duration            
            

            //Guardar Reserva
            await BookingModel.create(req.user.id, resource_id, formatted_start_time, formatted_end_time, total_price)
            
            const createdBooking = await BookingModel.getLastBooking(req.user.id)

            return res.status(201).json(jsonResponse(201, "Se creó la reserva", createdBooking))
            
        } catch (error) {
            return res.status(500).json(jsonResponse(500, "Error interno del servidor", error.message))
        }
    }

    




}