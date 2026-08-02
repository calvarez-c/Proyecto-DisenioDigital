import {ResourceModel} from '../models/resource.model.js'
import {jsonResponse} from '../helpers/json_response.js'
import {validateCreateResource, validateUpdateResource} from '../schemas/resources.schema.js'

export class ResourceController {

    static async getResources(req, res) {
        try {
            const resources = await ResourceModel.getActive()
            return res.status(200).json(jsonResponse(200, resorces))
        } catch (error){
            return res.status(500).json(jsonResponse(500,"Error interno del servidor.", error.message))
        }
    }

    static async createResource(req, res) {
        const validation = validateCreateResource(req.body)

        if (!validation.success) {
            return res.status(400).json(jsonResponse(400, validation.error.errors || validation.error.issues))
        }

        const {role} = req.user
        if (role !== 'ADMIN') {
            return res.status(403).json(jsonResponse(403, "No tienes permisos para realizar esta acción."))
        }

        try {
            const id = await ResourceModel.create(validation.data)
            return res.status(201).json(jsonResponse(201, "Recurso creado exitosamente.", {id}))
        }catch (error) {
            return res.status(500).json(jsonResponse(500, "Error interno del servidor.", error.message))
        }
    }
}