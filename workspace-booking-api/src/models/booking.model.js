import { pool } from '../config/db.js'

export class BookingModel {

    //QUERIES DE LECTURA
     static async getBooking(id) {
        await using conn = await pool.getConnection()       

        const [booking] = await conn.execute(
            `   SELECT  id, user_id, resource_id, start_time, end_time, 
                total_price, status, created_at
                FROM bookings WHERE id = ?    `,
            [id]
        )
        return booking[0]
    }
    
    static async getAllBookings() {
        await using conn = await pool.getConnection()       

        const [allBookings] = await conn.execute(
            `   SELECT  id, user_id, resource_id, start_time, end_time, 
                total_price, status, created_at
                FROM bookings   `
        )
        return allBookings
    }

    static async getMyBookings(user_id) {
        await using conn = await pool.getConnection()       

        const [myBookings] = await conn.execute(
            `   SELECT  id, user_id, resource_id, start_time, end_time, 
                total_price, status, created_at
                FROM bookings WHERE user_id = ?    `,
            [user_id]
        )
        return myBookings
    }

   

    static async getLastBooking(user_id) {
        await using conn = await pool.getConnection()       

        const [lastBooking] = await conn.execute(
            `   SELECT id, user_id, resource_id, start_time, end_time, 
                total_price, status, created_at
                FROM bookings WHERE user_id = ?
                ORDER BY created_at DESC LIMIT 1    `,
            [user_id]
        )
        return lastBooking
    }

    static async validateOverlap(resource_id, start_time,end_time ) {

        await using conn = await pool.getConnection()
        const [result] = await conn.execute(
            `   SELECT id
                FROM bookings 
                WHERE status = 'CONFIRMED' AND resource_id = ?
                AND start_time < ?
                AND end_time > ?    `,
            [resource_id, end_time, start_time ]
        )
        return result[0]
    }




    //QUERIES DE ESCRITURA

    static async createBooking( user_id, resource_id, start_time, end_time, total_price) {
        
        await using conn = await pool.getConnection()
        const [result] = await conn.execute(
            `   INSERT INTO bookings (user_id, resource_id, start_time, end_time, total_price) 
                VALUES (?, ?, ?, ?, ?)`,
            [user_id, resource_id, start_time, end_time, total_price]
        )
        return result
    }



    static async cancelBooking( id) {
        
        await using conn = await pool.getConnection()
        const [result] = await conn.execute(
            `   UPDATE bookings SET status  = 'CANCELLED'
                WHERE id = ? 
            `,
            [id]
        )
        return result
    }







    //TODO >> quitar este metodo ya que es temporal mientras se termina el modelo de los recursos
    static async getResource(resource_id) {
        await using conn = await pool.getConnection()       

        const [resource] = await conn.execute(
            `   SELECT  * FROM resources WHERE id = ?    `,
            [resource_id]
        )
        return resource[0]
    }
    
}