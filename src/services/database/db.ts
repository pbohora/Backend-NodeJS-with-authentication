import mongoose from 'mongoose'
import config from '../../config'

const connectDb = (url = config.dbUrl, opts = {}) => {
	return mongoose.connect(url, {
		...opts,
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
}

export default connectDb
