import {RequestHandler} from 'express'
import passport from 'passport'
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

export const signin: RequestHandler = (req, res, next) => {
	//const {email, password} = req.body
	//validate email and password

	passport.authenticate('local', (error, user, info) => {
		if (error) {
			res.json({error: 'invalid username or password'})
		}
		if (user) {
			console.log(user)
			res.json({message: 'sucess', user: user.toAuthJSON()})
		}
		res.status(400).json(info)
	})(req, res, next)
}
