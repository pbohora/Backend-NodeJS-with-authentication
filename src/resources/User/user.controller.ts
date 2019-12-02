import {RequestHandler} from 'express'
import {
	createNewUser,
	queryUsers,
	queryUser,
	updateUser,
	removeUser,
} from './user.service'

export const postUser: RequestHandler = async (req, res) => {
	try {
		const {fname, lname, password, email, avatar} = req.body

		const user = await createNewUser(fname, lname, password, email, avatar)
		res.status(201).json(user)
	} catch (error) {
		res.status(400).json({error: 'error at the controller ' + error})
	}
}

export const getUsers: RequestHandler = async (req, res) => {
	try {
		const users = await queryUsers()
		res.status(200).json(users)
	} catch (error) {
		res.status(400).json({error: 'error at controller ' + error})
	}
}

export const getUser: RequestHandler = async (req, res) => {
	try {
		const {id} = req.params
		const user = await queryUser(id)
		res.status(200).json(user)
	} catch (error) {
		res.status(400).json({error: 'error at controller ' + error})
	}
}

export const putUser: RequestHandler = async (req, res) => {
	try {
		const {id} = req.params
		const {fname, lname, password, email, avatar} = req.body
		const updatedUser = await updateUser(id, {
			fname,
			lname,
			password,
			email,
			avatar,
		})
		res.status(200).json(updatedUser)
	} catch (error) {
		res.status(400).json({error: 'error at controller ' + error})
	}
}

export const deleteUser: RequestHandler = async (req, res) => {
	try {
		const {id} = req.params
		await removeUser(id)
		res.status(204)
	} catch (error) {
		res.status(400).json({error: 'error at controller ' + error})
	}
}
