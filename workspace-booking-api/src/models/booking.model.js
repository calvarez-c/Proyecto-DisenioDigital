import { pool } from '../config/db.js'

export class BookingModel {


    static async getMyBookings(user_id) {
        await using conn = await pool.getConnection()
        
        console.log(user_id);
        

        const [myBookings] = await conn.execute(
            `   SELECT  id, user_id, resource_id, start_time, end_time, 
                total_price, status, created_at
                FROM bookings WHERE user_id = ?    `,
            [user_id]
        )
        return myBookings
    }
    
}