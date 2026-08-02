import {Router} from 'express'
import {isAuth} from '../middlewares/isAuth.js'
import {ResourceController} from '../controllers/resources.controller.js'

export const resourceRouter = Router()

resourceRouter.get('/', ResourceController.getResources)
resourceRouter.post('/', isAuth, ResourceController.createResource)
resourceRouter.put('/:id', isAuth, ResourceController.updateResource)