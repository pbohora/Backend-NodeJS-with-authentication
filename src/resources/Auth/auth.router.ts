import Router from 'express'
import {signup} from './auth.controller'

const router = Router()

router.post('/', signup)

export default router
