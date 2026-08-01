import { pool } from '../config/db.js'

export class UserModel {
    static async create({ name, email, passwordHash }) {
        await using conn = await pool.getConnection()
        const [result] = await conn.query(
            `INSERT INTO users (name, email, password_hash, role) 
       VALUES (?, ?, ?, 'CLIENT')`,
            [name, email, passwordHash]
        )
        return result
    }

    static async findByEmail({ email }) {
        await using conn = await pool.getConnection()
        const [users] = await conn.query(
            `SELECT id, name, email, password_hash AS password, role 
       FROM users WHERE email = ?`,
            [email]
        )
        return users[0] || null
    }
}