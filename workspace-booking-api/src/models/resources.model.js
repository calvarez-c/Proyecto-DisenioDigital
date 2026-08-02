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

    static async create({name, description, capacity, price_per_hour}) {
        await using conn = await pool.getConnection()

        const [result] = await conn.execute(
            `insert into resources (name, description,
            capacity, price_per_hour)
            values (?, ?, ?, ?)`, [name, description, capacity, price_per_hour]
        )
            return result.insertId
    }

    static async update(id, fields){
        await using conn = await pool.getConnection()

        const keys = Object.keys(fields)
        const values = Object.values(fields)
        const setClause = keys.map(k => `${k} = ?`).join(', ')

        await conn.execute(
            `update resources set ${setClause} where id = ?`,
            [...values, id]
        )
    }
}
