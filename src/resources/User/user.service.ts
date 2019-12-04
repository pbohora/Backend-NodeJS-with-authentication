import UserModel from './user.model'
import {User} from './user.interface'

export const queryUsers = async () => {
	try {
		const users = await UserModel.find({})
		return users.map(user => user.toJSON())
	} catch (error) {
		return error
	}
}

export const queryUser = async (id: string) => {
	try {
		const user = await UserModel.findById(id)
		return user.toJSON()
	} catch (error) {
		return error
	}
}

export const updateUser = async (id: string, newUser: User) => {
	try {
		const updatedUser = await UserModel.findOneAndUpdate(id, newUser, {
			new: true,
		})
		return updatedUser.toJSON()
	} catch (error) {
		return error
	}
}

export const removeUser = async (id: string) => {
	try {
		return await UserModel.findByIdAndRemove(id)
	} catch (error) {
		return error
	}
}
