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
            await BookingModel.createBooking(req.user.id, resource_id, formatted_start_time, formatted_end_time, total_price)
            
            const createdBooking = await BookingModel.getLastBooking(req.user.id)

            return res.status(201).json(jsonResponse(201, "Se creó la reserva", createdBooking))
            
        } catch (error) {
            return res.status(500).json(jsonResponse(500, "Error interno del servidor", error.message))
        }
    }




    static async cancelBooking(req, res) {
        
        const req_user_id = req.user.id
        const booking_id = req.params.id

        try{

            //Obtiene la reserva a cancelar y valida si existe
            const result = await BookingModel.getBooking(booking_id)
            
            if (!result) {
                return res.status(400).json(jsonResponse(400, "No se encontró la reserva a cancelar"))
            }

            //Valida que el usuario sea el creador de la reserva a cancelar
            const {user_id, start_time} = result

            if (req_user_id !== user_id) {
                return res.status(403).json(jsonResponse(403, "No tiene acceso para cancelar la reserva"))
            }

            //Valida que esté a tiempo de cancelar la reserva (minimo 12 hrs)
            const remaining_hours = ( new Date(start_time) - new Date() ) / (1000 * 60 * 60)

            if (remaining_hours < 12 ) {
                return res.status(400).json(jsonResponse(400, "Solo puede cancelar reservas con 12 horas de anticipación"))
            }

            await BookingModel.cancelBooking(booking_id)

            return res.status(200).json(jsonResponse(200, "Se canceló la reserva"))
        
        } catch (error) {            
            return res.status(500).json(jsonResponse(500, "Error interno del servidor", error.message))
        }
    }





}