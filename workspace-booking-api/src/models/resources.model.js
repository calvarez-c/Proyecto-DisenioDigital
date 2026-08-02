import {pool} from '../config/db.js'

export class ResourceModel { 
    static async getAll() {
        await using conn = await pool.getConnection()

        const [rows] = await conn.execute(
            `select id, name, description, capacity, 
            price_per_hour, is_active, created_at 
            from resources`)
        return rows
    }
}