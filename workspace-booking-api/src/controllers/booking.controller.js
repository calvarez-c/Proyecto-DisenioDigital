import jwt from 'jsonwebtoken'
import { jsonResponse } from '../helpers/json_response.js'
import { BookingModel } from '../models/booking.model.js'

export class BookingController {


    static async getMyBookings(req, res) {
        
        const user_id = req.user.id

        try{
            const bookings = await BookingModel.getMyBookings(user_id)

            return res.status(200).json(jsonResponse(200, `Reservas de usuario #${user_id}`, bookings))
        
        } catch (error) {            
            return res.status(500).json(jsonResponse(500, "Error interno del servidor", error.message))
        }
    }




}