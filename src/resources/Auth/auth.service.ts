import UserModel from '../User/user.model'
import {User} from '../User/user.interface'
import _ from 'lodash'

export const createNewUser = async (newUser: User) => {
	try {
		const existingUser = await UserModel.findOne({email: newUser.email})
		if (existingUser) {
			return {error: 'Email already in use'}
		}
		let user = new UserModel()
		user = _.merge(user, newUser)
		const savedUser = await user.save()
		return savedUser.toJSON()
	} catch (error) {
		return error
	}
}
