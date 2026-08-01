import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'
import { validateRegister, validateLogin } from '../schemas/auth.schema.js'
import { jsonResponse } from '../helpers/json_response.js'

export class AuthController {

    static async register(req, res) {
        const result = validateRegister(req.body)
        if (!result.success) {
            return res.status(400).json(jsonResponse(400, result.error.errors || result.error.issues))
        }

        const { name, email, password } = result.data

        try {
            const existingUser = await UserModel.findByEmail({ email })
            if (existingUser) {
                return res.status(409).json(jsonResponse(409, "El email ya está registrado"))
            }

            const passwordHash = await argon2.hash(password)
            await UserModel.create({ name, email, passwordHash })

            return res.status(201).json(jsonResponse(201, "Usuario registrado con éxito"))
        } catch (error) {
            return res.status(500).json(jsonResponse(500, "Error interno del servidor"))
        }
    }

    static async login(req, res) {
        const result = validateLogin(req.body)
        if (!result.success) {
            return res.status(400).json(jsonResponse(400, result.error.errors || result.error.issues))
        }

        const { email, password } = result.data

        try {
            const user = await UserModel.findByEmail({ email })

            if (!user) {
                return res.status(401).json(jsonResponse(401, "Credenciales inválidas"))
            }

            const isValidPassword = await argon2.verify(user.password, password)
            if (!isValidPassword) {
                return res.status(401).json(jsonResponse(401, "Credenciales inválidas"))
            }

            const tokenPayload = {
                id: user.id,
                email: user.email,
                role: user.role
            }

            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '8h' })

            return res.status(200).json(jsonResponse(200, { token }))
        } catch (error) {
            return res.status(500).json(jsonResponse(500, "Error interno del servidor"))
        }
    }
}