import Router from 'express'
import {signup, signin} from './auth.controller'

const router = Router()

router.post('/', signup)
router.post('/signin', signin)

export default router
