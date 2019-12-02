import app from './server'
import config from './config'
import connectDb from './services/database/db'

connectDb()
	.then(() => {
		console.log('Databse is connected')
	})
	.catch(() => {
		console.log('error connecting database')
	})

const server = app.listen(config.authPort, () => {
	console.log('running at port ', config.authPort)
})

process.on('unhandledRejection', e => {
	server.close(() => {
		process.exit(1)
	})
})
