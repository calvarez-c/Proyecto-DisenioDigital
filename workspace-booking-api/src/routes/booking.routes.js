import { Router } from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import { BookingController } from '../controllers/booking.controller.js'

export const bookingRouter = Router()

bookingRouter.get('/', isAuth, BookingController.getAllBookings )

bookingRouter.get('/my-bookings', isAuth, BookingController.getMyBookings )

bookingRouter.post('/', isAuth, BookingController.createBooking )

