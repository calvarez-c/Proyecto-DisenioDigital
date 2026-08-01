import jwt from 'jsonwebtoken'
import { jsonResponse } from '../helpers/json_response.js'
import { BookingModel } from '../models/booking.model.js'

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

    




}