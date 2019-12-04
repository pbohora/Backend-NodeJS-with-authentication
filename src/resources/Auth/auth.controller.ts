import {RequestHandler} from 'express'
import {createNewUser} from './auth.service'
import {User} from '../User/user.interface'

export const signup: RequestHandler = async (req, res) => {
	try {
		const {fname, lname, email, password, avatar} = req.body
		const newUser: User = {
			fname,
			lname,
			email,
			password,
			avatar,
		}
		const status = await createNewUser(newUser)
		console.log(status)
		if (status.error) {
			res.status(400).json(status.error)
		}
		res.status(201).json(status)
	} catch (error) {
		return error
	}
}
