import express from 'express'
import dotenv from 'dotenv/config'
import { authRouter } from './src/routes/auth.routes.js'
import { bookingRouter } from './src/routes/booking.routes.js'
import { resourceRouter } from './src/routes/resources.routes.js'

const app = express()
app.use(express.json())

const baseURL = '/api/v1'

app.use(`${baseURL}/auth`, authRouter)

app.use(`${baseURL}/bookings`, bookingRouter)

app.use(`${baseURL}/resources`, resourceRouter)

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`))
}

export { app }