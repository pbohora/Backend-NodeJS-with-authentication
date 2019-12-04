import UserModel from '../../resources/User/user.model'

export const queryUser = async (userEmail: string) => {
	try {
		const user = await UserModel.findOne({email: userEmail})
		return user
	} catch (error) {
		return error
	}
}
