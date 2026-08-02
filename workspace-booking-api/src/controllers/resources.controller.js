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
}