import jwt from 'jsonwebtoken'
import { jsonResponse } from '../helpers/json_response.js'
import { BookingModel } from '../models/booking.model.js'
import { validateBooking } from '../schemas/booking.schema.js'
import { start } from 'node:repl'

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




    static async createBooking(req, res) {
            const result = validateBooking(req.body) //TODO >> validar body con zod

            if (!result.success) {
                return res.status(400).json(jsonResponse(400, result.error.errors || result.error.issues))
            }
                
            const  resource_id  = result.data.resource_id
            const  start_time  = new Date(result.data.start_time)
            const  end_time  = new Date(result.data.end_time)


            if (end_time < start_time  || start_time < new Date() ) {
                return res.status(400).json(jsonResponse(400, "La fecha de inicio debe ser menor que la fecha de fin y no puede ser una fecha pasada"))                
            }


            try {

                
                return res.status(201).json(jsonResponse(201, "éxito"))
            
            
            } catch (error) {
                return res.status(500).json(jsonResponse(500, "Error interno del servidor", error.message))
            }
        }

    




}