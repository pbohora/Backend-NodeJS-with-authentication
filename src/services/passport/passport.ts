import passport from 'passport'
import localStrategy from 'passport-local'
import {queryUser} from './passport.service'

const LocalStrategy = localStrategy.Strategy

const initPassport = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
			},
			async (email, password, done) => {
				try {
					const user = await queryUser(email)
					if (!user) {
						return done('user not found', false)
					}
					if (user.checkPassword(password)) {
						return done(null, user)
					} else {
						return done('password not matched', false)
					}
				} catch (error) {
					done(error)
				}
			},
		),
	)
}

export default initPassport
