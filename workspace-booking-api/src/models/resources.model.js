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

    static async getActive() { 
        await using conn = await pool.getConnection()

        const [rows] = await conn.execute(
            `select id, name, description, capacity,
            price_per_hour, is_active, created_at
            from resources where is_active = TRUE`)
            return rows
    }

    static async getById(id) {
        await using conn = await pool.getConnection()
        const [rows] = await conn.execute(
            `select id, name, description, capacity,
            price_per_hour, is_active, created_at
            from resources where id = ?`, [id])
        return rows[0]
    }
}
