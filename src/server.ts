import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyparser from 'body-parser'
import userRouter from './resources/User/user.router'

const app = express()

app.use(bodyparser.urlencoded({extended: true}))

app.get('/', (req, res) => {
	res.status(200).json({message: 'server is running'})
})

app.use('/users', userRouter)

export default app
