import jwt from 'jsonwebtoken'
import { jsonResponse } from '../helpers/json_response.js'

export const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    // Corrección de Bug: Validar existencia antes de hacer .split()
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json(jsonResponse(401, "Acceso no autorizado. Token faltante"))
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // Inyecta { id, email, role } a la request
        next()
    } catch (error) {
        return res.status(401).json(jsonResponse(401, "Token inválido o expirado"))
    }
}