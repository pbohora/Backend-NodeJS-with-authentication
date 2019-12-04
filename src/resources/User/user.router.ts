import Router from 'express'
import {getUsers, getUser, putUser, deleteUser} from './user.controller'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', putUser)
router.delete('/:id', deleteUser)

export default router
