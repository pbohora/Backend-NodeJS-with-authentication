import mongoose, {Document} from 'mongoose'
import {User} from './user.interface'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export interface UserDocument extends Document, User {
	checkPassword: (password: string) => boolean
}

const userSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: true,
	},
	lname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: String,
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	},
})

userSchema.methods.toAuthJSON = function() {
	return {
		fname: this.fname,
		email: this.email,
		id: this._id,
		token: this.generateToken(),
	}
}
userSchema.pre<UserDocument>('save', function(next) {
	if (this.password && this.isModified('password')) {
		const salt = bcrypt.genSaltSync(10)
		this.password = bcrypt.hashSync(this.password, salt)
	}

	next()
})

userSchema.methods.checkPassword = function(plainPassword: string) {
	const hashPassword = this.password
	return bcrypt.compareSync(plainPassword, hashPassword)
}

userSchema.methods.generateToken = function() {
	const userToken = {
		email: this.email,
		id: this._id,
	}
	return jwt.sign(userToken, process.env.SECRET)
}

const User = mongoose.model('User', userSchema)

export default User
